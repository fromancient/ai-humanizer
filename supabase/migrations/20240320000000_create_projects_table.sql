-- Create projects table
create table if not exists public.projects (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    input text not null,
    output text not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policy to allow users to view their own projects
create policy "Users can view their own projects"
    on public.projects for select
    using (auth.uid() = user_id);

-- Create policy to allow users to insert their own projects
create policy "Users can insert their own projects"
    on public.projects for insert
    with check (auth.uid() = user_id);

-- Create policy to allow users to delete their own projects
create policy "Users can delete their own projects"
    on public.projects for delete
    using (auth.uid() = user_id); 