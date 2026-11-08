-- Run once in Supabase SQL Editor before deploying this update.
-- A null finished_date means the user recorded only a year (or no completion date).
alter table public.user_books add column if not exists finished_date date;
