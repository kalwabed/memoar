create table
  public.post_analytics (
    id uuid not null default gen_random_uuid (),
    post_id uuid null,
    viewer integer null default 0,
    created_at timestamp with time zone null default now(),
    constraint post_analytics_pkey primary key (id),
    constraint post_analytics_post_id_fkey foreign key (post_id) references posts (id) on delete cascade
  ) tablespace pg_default;
