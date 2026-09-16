create table if not exists responses (
  id serial primary key,
  first_name text not null,
  live_area text not null,
  work_area text not null default '',
  convenient_areas text not null,
  travel_willingness text not null,
  preferred_days text not null,
  preferred_times text not null,
  time_windows text not null,
  class_types text not null,
  frequency text not null,
  stated_price int not null,
  commit_price int not null,
  packages text not null,
  commitment_style text not null,
  makeup_valued text not null,
  studio_priorities text not null,
  true_yoga_student boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists responses_live_area_idx on responses (live_area);
create index if not exists responses_created_at_idx on responses (created_at);
