create table
  public.reactions (
    id uuid not null default gen_random_uuid (),
    post_id uuid null,
    user_id uuid null,
    created_at timestamp with time zone null default now(),
    constraint reactions_pkey primary key (id),
    constraint reactions_post_id_fkey foreign key (post_id) references posts (id) on delete cascade,
    constraint reactions_user_id_fkey foreign key (user_id) references users (id)
  ) tablespace pg_default;
