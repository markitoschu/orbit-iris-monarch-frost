-- ===============================================================
-- Nila Survey — Supabase setup / repair script  (v2)
-- Where to run: Supabase Dashboard → SQL Editor → New query → Run
--
-- What's different in v2: it now REBUILDS the table if an older
-- version (with the extra required column "travel_willingness")
-- is in the way — that old table blocks every form submission.
--
-- Safety: if the table ever contains REAL student data, this
-- script stops and changes nothing. Safe to run any number of times.
-- ===============================================================

-- 1) SAFETY GUARD: remove the old table ONLY if it has no real data.
do $$
declare n bigint;
begin
  if to_regclass('public.responses') is not null then
    execute 'select count(*) from public.responses where name <> ''Smoke Test''' into n;
    if n = 0 then
      execute 'drop table public.responses';
      raise notice 'Old empty table removed — rebuilding with the correct columns.';
    else
      raise exception 'STOP: responses has % row(s) of real data. Nothing was changed. Paste this message into the chat.', n;
    end if;
  end if;
end $$;

-- 2) The table, matching the current form code exactly
create table public.responses (
  id                   bigint generated always as identity primary key,
  name                 text        not null,
  contact_number       text        not null default '',
  location_preference  text        not null,
  availability         jsonb       not null default '{}'::jsonb,
  class_types          jsonb       not null default '[]'::jsonb,
  created_at           timestamptz not null default now()
);

-- 3) Confirm the structure (should show exactly these 7 columns:
--    id, name, contact_number, location_preference,
--    availability, class_types, created_at)
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'responses'
order by ordinal_position;

-- 4) Smoke test: insert one row and read it back.
--    If this succeeds, the database side is DONE.
insert into public.responses
  (name, contact_number, location_preference, availability, class_types)
values
  ('Smoke Test', '91234567', 'tampines',
   '{"mon":["0730"],"sat":["early"]}',
   '["hatha"]');

select id, name, contact_number, location_preference, created_at
from public.responses
order by id desc
limit 5;

-- 5) Remove the smoke test row when testing is done:
-- delete from public.responses where name = 'Smoke Test';
