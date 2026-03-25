-- Run this in Supabase → SQL Editor (once per project).
-- Then: Authentication → Users → add an admin user with email + password.

create extension if not exists "pgcrypto";

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  enquiry_type text not null,
  message text not null
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default 'Stories',
  pill_theme text not null default 'coral',
  date text not null,
  hero_image_url text,
  content_markdown text,
  blocks jsonb,
  constraint blog_posts_pill_theme_check check (pill_theme in ('coral', 'forest', 'mustard'))
);

alter table public.enquiries enable row level security;
alter table public.blog_posts enable row level security;

-- Enquiries: public can submit (anon insert)
drop policy if exists "enquiries_insert_anon" on public.enquiries;
create policy "enquiries_insert_anon"
  on public.enquiries for insert
  to anon
  with check (true);

-- Same site may use one browser session for /admin and the contact form (authenticated role).
drop policy if exists "enquiries_insert_authenticated" on public.enquiries;
create policy "enquiries_insert_authenticated"
  on public.enquiries for insert
  to authenticated
  with check (true);

-- Enquiries: admins (authenticated) can read
drop policy if exists "enquiries_select_auth" on public.enquiries;
create policy "enquiries_select_auth"
  on public.enquiries for select
  to authenticated
  using (true);

-- Enquiries: admins can delete
drop policy if exists "enquiries_delete_auth" on public.enquiries;
create policy "enquiries_delete_auth"
  on public.enquiries for delete
  to authenticated
  using (true);

-- Blog: anyone can read published stories
drop policy if exists "blog_select_anon" on public.blog_posts;
create policy "blog_select_anon"
  on public.blog_posts for select
  to anon
  using (true);

drop policy if exists "blog_select_auth" on public.blog_posts;
create policy "blog_select_auth"
  on public.blog_posts for select
  to authenticated
  using (true);

-- Blog: only signed-in admins can write
drop policy if exists "blog_insert_auth" on public.blog_posts;
create policy "blog_insert_auth"
  on public.blog_posts for insert
  to authenticated
  with check (true);

drop policy if exists "blog_update_auth" on public.blog_posts;
create policy "blog_update_auth"
  on public.blog_posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "blog_delete_auth" on public.blog_posts;
create policy "blog_delete_auth"
  on public.blog_posts for delete
  to authenticated
  using (true);
