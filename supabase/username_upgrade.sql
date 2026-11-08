-- Verlio username-only authentication upgrade. Run ONCE on your existing project.
-- Supabase Email provider MUST be enabled, with Confirm email OFF for this prototype.
-- Internal .invalid addresses are NOT deliverable email addresses.
-- Existing email/password accounts continue to work in Supabase, but the new screen
-- only supports username-only accounts; use the old app to access legacy accounts.
create or replace function public.new_user_profile() returns trigger
language plpgsql security definer set search_path = '' as $$
declare uname text;
begin
  uname := lower(coalesce(new.raw_user_meta_data ->> 'verlio_username',''));
  if uname !~ '^[a-z0-9_]{3,24}$' then
    uname := 'reader_' || substr(replace(new.id::text,'-',''),1,16);
  end if;
  insert into public.profiles(id,username,display_name)
  values(new.id,uname,'');
  return new;
end;
$$;

-- Keep username identity and internal sign-in identifier in sync by making it immutable.
create or replace function public.lock_username_identity() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if old.username is distinct from new.username
    and exists (select 1 from auth.users u where u.id = old.id
      and u.email like '%@accounts.verlio.invalid') then
    raise exception 'Username changes are not yet supported for username-only accounts';
 end if;
 return new;
end;
$$;
drop trigger if exists lock_username_identity on public.profiles;
create trigger lock_username_identity before update on public.profiles
for each row execute function public.lock_username_identity();
