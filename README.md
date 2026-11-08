# Verlio — Username Login Update

This is an UPDATED copy of your Verlio starter. It includes the same books, words, friends and profile screens with a username/password sign-up and sign-in UI. Email is optional at signup and is NOT required to log in.

## Important: prototype limitations

Supabase's built-in password provider requires an email-shaped identifier. This prototype internally derives a non-deliverable address from the username (`username@accounts.verlio.invalid`). The user never needs to provide a real email. Optional contact email is stored as private authentication metadata but is **not verified and does not provide password recovery**. Losing your password may mean losing access to the account. This setup is for private testing, NOT a public production release. Before launching publicly, implement a server-side username authentication service, rate limits/abuse protections, secure account recovery, and account lifecycle management. Avoid putting real user data into an unreviewed prototype.

## Upgrade your EXISTING project

1. Back up your current `verlio` folder (especially your `.env` file). The ZIP deliberately does NOT include `.env` or your keys.
2. Supabase → SQL Editor: run `supabase/username_upgrade.sql` **once** on the existing project. **Do not rerun `schema.sql`**; your four tables already exist. Existing books and vocabulary are not deleted.
3. Supabase → Authentication → Providers → Email: keep Email provider enabled and **turn OFF Confirm email** for this private prototype. This reduces account verification security and should not be used for a public launch.
4. Extract the ZIP and copy your original `.env` file into the new `verlio` folder. The URL must end in `.supabase.co` (NO `/rest/v1/`). Never paste your secret/service-role key into the app.
5. In the new `verlio` folder run `npm install` and `npm run dev`. If the old dev server is still running, stop it with Ctrl+C first.
6. Click **Create an account**, choose a unique username and password, optionally enter an email, and test login/logout.
7. Existing accounts made with real emails are not automatically converted. Their data remains in Supabase, but this version doesn't provide an email login screen. Ask for an account migration before using an existing account's data in this version.

## Caveats

- Username is fixed for username-only accounts; changing it would break the internal sign-in mapping.
- Optional contact email does not currently provide password resets, verification, or notifications.
- If signup fails due to a duplicate username, choose a different username.
- If Supabase rejects synthetic email domains, a server-side username authentication backend is needed; do not use a real person's email without permission.
- This is a web app, not an App Store build. Google Books lookup and existing RLS policies remain unchanged.


## Open Library book search update

This release replaces the Google Books search endpoint with the public Open Library Search API. No Google API key is required. Search returns titles, authors, and covers when available. Some Open Library entries do not have covers or full descriptions.

**No Supabase SQL changes are needed for this update.** To keep compatibility with your existing Supabase schema, the `google_id` column continues to store unique book identifiers, now prefixed with `openlibrary:`. Existing saved books are preserved.

To update: stop the old dev server (Ctrl+C), extract this ZIP, copy your own `.env` file into the new `verlio` folder (never share the file), then run `npm install` and `npm run dev` there.

The Open Library API is a public service with rate limits; avoid automated high-frequency searching.


## Dictionary lookup update
The Words page now asks for only a word, fetches its definition from https://dictionaryapi.dev/, previews it, and saves it to the existing `saved_words` table. No new SQL or API key is needed. Dictionary entries may omit example sentences. Requires an internet connection. Existing saved words are preserved.


## Book search navigation update
When leaving Books, the temporary book search field and results are cleared. Saved books remain unchanged. In-flight searches cannot repopulate the results after navigating away.


## Collapsible bookshelves
The Reading, Finished, and Want to Read shelves on the Books page are now collapsible. Tap a shelf heading to expand/collapse it; counts stay visible. Shelves begin collapsed.


## Vocabulary page update
The Word of the Day is shown on Home and at the top of Words, with the same daily word and a direct Save this word button. It is disabled if the word is already in the saved vocabulary. No SQL changes required.

## Profile navigation update
The top navigation is Books, Words, Profile. Friends and friend requests are inside the Profile tab in an expandable Friends section. No Supabase migration is required.

## Search and completion-date update
Run `supabase/completion_date_upgrade.sql` in your existing Supabase project's SQL Editor **before deploying**. Search ranks exact title/author matches, filters study guides and summaries, removes repeated title-author pairs, and shows up to ten results. Click a search result to read details. For books marked Finished, click **Edit completion** to save either a year or an exact date. Existing finished years are preserved.

## November 2026 bookshelf update
- Home welcome banner shows three rotating book covers on desktop and two on mobile, changing groups every five seconds.
- Books, Home reading shelf and friends' books use horizontal cover-only digital shelves.
- Tap a saved book to view status, edit its completion year/full date, or remove it. Friends' books are read-only.
- This package retains the prior search relevance and Supabase completion-date upgrade.
