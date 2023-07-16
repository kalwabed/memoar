create table
  public.posts (
    id uuid not null default gen_random_uuid (),
    title character varying not null,
    slug character varying not null,
    content text null default ''::text,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    user_id uuid null,
    constraint topics_pkey primary key (id),
    constraint posts_user_id_fkey foreign key (user_id) references users (id)
  ) tablespace pg_default;
