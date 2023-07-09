create table
  public.users (
    id uuid not null default gen_random_uuid (),
    username text not null,
    fullname text not null,
    avatar_url text null,
    created_at timestamp with time zone null default now(),
    constraint users_pkey primary key (id),
    constraint users_username_key unique (username)
  ) tablespace pg_default;
