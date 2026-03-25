-- Visitors who are signed in to Supabase (e.g. after opening /admin in the same browser)
-- use the "authenticated" role, not "anon". The original policy only allowed anon inserts,
-- which caused: "new row violates row-level security policy for table enquiries".

drop policy if exists "enquiries_insert_authenticated" on public.enquiries;
create policy "enquiries_insert_authenticated"
  on public.enquiries for insert
  to authenticated
  with check (true);
