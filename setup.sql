-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create 'players' table
create table if not exists public.players (
  id uuid default uuid_generate_v4() primary key,
  address text not null unique,
  last_seen timestamptz default now(),
  points numeric default 100,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS) for players
alter table public.players enable row level security;

-- Drop existing policies to avoid errors on re-run
drop policy if exists "Public players are viewable by everyone" on public.players;
drop policy if exists "Anyone can insert players" on public.players;
drop policy if exists "Players can update own last_seen" on public.players;
drop policy if exists "Players can update own points" on public.players;

-- Create policy to allow public read access for players (adjust if needed)
create policy "Public players are viewable by everyone" 
on public.players for select 
using ( true );

-- Create policy to allow authenticated/anon users to insert players
create policy "Anyone can insert players" 
on public.players for insert 
with check ( true );

-- Create policy to allow users to update their own last_seen (checking address)
create policy "Players can update own last_seen"
on public.players for update
using ( true ); -- Simplified for demo

-- Create policy to allow users to update their own points
create policy "Players can update own points"
on public.players for update
using ( true );

-- Create 'transactions' table (used for volume and rewards)
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  amount numeric not null,
  type text not null check (type in ('volume', 'reward')),
  created_at timestamptz default now()
);

-- Enable RLS for transactions
alter table public.transactions enable row level security;

drop policy if exists "Transactions are viewable by everyone" on public.transactions;
drop policy if exists "Everyone can insert transactions" on public.transactions;

create policy "Transactions are viewable by everyone"
on public.transactions for select
using ( true );

create policy "Everyone can insert transactions"
on public.transactions for insert
with check ( true );

-- RPC Function to get total transaction volume
create or replace function get_total_volume()
returns numeric
language sql
as $$
  select coalesce(sum(amount), 0)
  from public.transactions
  where type = 'volume';
$$;

-- RPC Function to get total rewards
create or replace function get_total_rewards()
returns numeric
language sql
as $$
  select coalesce(sum(amount), 0)
  from public.transactions
  where type = 'reward';
$$;

-- Create 'dream_team_submissions' table
create table if not exists public.dream_team_submissions (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  tokens jsonb not null,
  captain_id text,
  vice_captain_id text,
  created_at timestamptz default now()
);

-- Enable RLS for dream_team_submissions
alter table public.dream_team_submissions enable row level security;

drop policy if exists "Dream Team submissions are viewable by everyone" on public.dream_team_submissions;
drop policy if exists "Anyone can insert Dream Team submissions" on public.dream_team_submissions;

create policy "Dream Team submissions are viewable by everyone"
on public.dream_team_submissions for select
using ( true );

create policy "Anyone can insert Dream Team submissions"
on public.dream_team_submissions for insert
with check ( true );

-- Create 'pvp_bets' table
create table if not exists public.pvp_bets (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  symbol text not null,
  direction text not null CHECK (direction IN ('up', 'down')),
  amount numeric not null,
  duration integer not null,
  status text not null default 'open' CHECK (status IN ('open', 'matched', 'completed', 'cancelled')),
  opponent_address text,
  start_price numeric,
  end_price numeric,
  created_at timestamptz default now(),
  expires_at timestamptz
);

-- Enable RLS for pvp_bets
alter table public.pvp_bets enable row level security;

drop policy if exists "PvP bets are viewable by everyone" on public.pvp_bets;
drop policy if exists "Anyone can insert/update PvP bets" on public.pvp_bets;

create policy "PvP bets are viewable by everyone"
on public.pvp_bets for select
using ( true );

create policy "Anyone can insert/update PvP bets"
on public.pvp_bets for all
using ( true );

-- Create 'candle_predictions' table
create table if not exists public.candle_predictions (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  symbol text not null,
  direction text not null CHECK (direction IN ('up', 'down')),
  timeframe text not null,
  entry_price numeric,
  wager_amount numeric,
  status text default 'pending',
  result text,
  created_at timestamptz default now()
);

-- Enable RLS for candle_predictions
alter table public.candle_predictions enable row level security;

drop policy if exists "Candle predictions are viewable by everyone" on public.candle_predictions;
drop policy if exists "Anyone can insert candle predictions" on public.candle_predictions;

create policy "Candle predictions are viewable by everyone"
on public.candle_predictions for select
using ( true );

create policy "Anyone can insert candle predictions"
on public.candle_predictions for insert
with check ( true );

-- Create 'sprint_predictions' table (60 Sec Sprint)
create table if not exists public.sprint_predictions (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  symbol text not null,
  direction text not null CHECK (direction IN ('up', 'down')),
  duration integer default 60,
  start_price numeric,
  end_price numeric,
  result text,
  status text default 'active',
  created_at timestamptz default now()
);

-- Enable RLS for sprint_predictions
alter table public.sprint_predictions enable row level security;

drop policy if exists "Sprint predictions are viewable by everyone" on public.sprint_predictions;
drop policy if exists "Anyone can insert sprint predictions" on public.sprint_predictions;

create policy "Sprint predictions are viewable by everyone"
on public.sprint_predictions for select
using ( true );

create policy "Anyone can insert sprint predictions"
on public.sprint_predictions for insert
with check ( true );

-- Create 'duels' table
create table if not exists public.duels (
  id uuid default uuid_generate_v4() primary key,
  user_address text not null,
  token_a_id text not null,
  token_b_id text not null,
  predicted_winner text not null check (predicted_winner in ('A', 'B')),
  duration integer not null,
  start_time timestamptz default now(),
  end_time timestamptz not null,
  start_price_a numeric,
  start_price_b numeric,
  end_price_a numeric,
  end_price_b numeric,
  status text default 'active',
  created_at timestamptz default now()
);

-- Enable RLS for duels
alter table public.duels enable row level security;

drop policy if exists "Duels are viewable by everyone" on public.duels;
drop policy if exists "Anyone can insert duels" on public.duels;
drop policy if exists "Anyone can update duels" on public.duels;

create policy "Duels are viewable by everyone" on public.duels for select using (true);
create policy "Anyone can insert duels" on public.duels for insert with check (true);
create policy "Anyone can update duels" on public.duels for update using (true);
