# GET DONE — APPLICATION SPECIFICATION FILE
**Version:** 1.0.0 | **Last Updated:** 2026-03-14 | **Author:** Muhammed Ajmal

---

> ⚠️ **AI AGENT MANDATORY INSTRUCTION**
> Before performing ANY task on this project, you MUST read this file completely.
> After completing your task, you MUST update the relevant sections of this file.
> Do not assume, guess, or invent application behavior. Use only what is documented here.
> If something is unclear, ask the user — do not fill gaps with assumptions.

---

## QUICK-START PROMPT (Use this at the start of every AI task)

Paste this at the beginning of every AI prompt:

```
Before doing anything, read APP_SPEC.md in the project root completely.
Follow the application architecture, rules, and constraints documented there.
After completing the task, update APP_SPEC.md with any changes you made.
Do not add features, libraries, or patterns not already in the spec.
Do not change anything not explicitly requested.
```

---

## TABLE OF CONTENTS

1. [Application Overview](#1-application-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project File Structure](#3-project-file-structure)
4. [TypeScript Types & Interfaces](#4-typescript-types--interfaces)
5. [State Management (Zustand Store)](#5-state-management-zustand-store)
6. [Storage & Data Persistence](#6-storage--data-persistence)
7. [Components Reference](#7-components-reference)
8. [Views Reference](#8-views-reference)
9. [Routing System](#9-routing-system)
10. [Styling System](#10-styling-system)
11. [Known Bugs & Issues](#11-known-bugs--issues)
12. [Prioritized Improvements Roadmap](#12-prioritized-improvements-roadmap)
13. [AI Agent Rules & Constraints](#13-ai-agent-rules--constraints)
14. [Git & Repository](#14-git--repository)
15. [Change Log](#15-change-log)

---

## 1. APPLICATION OVERVIEW

### What is Get Done?
Get Done is a **personal productivity task manager** built as a Progressive Web App (PWA). It runs entirely in the browser with no backend. All data is stored in localStorage.

### Core Concept
A unified productivity hub combining:
- **Task Management** — Create, organize, complete tasks
- **Project Organization** — Group tasks into projects with color coding
- **Label System** — Tag tasks with labels
- **Habit Tracking** — Daily habits with streak counting (7-day ring history)
- **Pomodoro Timer** — Focus sessions with work/break phases
- **Eisenhower Matrix** — Prioritize by urgency/importance
- **GTD System** — Getting Things Done context-based workflow

### Target Platform
- Desktop (primary): sidebar nav layout
- Mobile (secondary): bottom nav + sidebar drawer

### Design Philosophy
- Dark theme always on (no light mode toggle)
- Purple primary color (`#800080`) — action-forward design
- Surface dark palette (`#171717` to `#fafafa`)
- Minimal UI — no clutter, task-first
- Mobile-first responsive layout

---

## 2. TECH STACK & DEPENDENCIES

### Production Dependencies

| Package | Version | Status | Purpose |
|---------|---------|--------|---------|
| react | ^18.3.1 | ✅ Active | UI rendering |
| react-dom | ^18.3.1 | ✅ Active | DOM binding |
| zustand | ^5.0.1 | ✅ Active | Global state management |
| date-fns | ^4.1.0 | ✅ Active | Date formatting, parsing, calculations |
| lucide-react | ^0.460.0 | ✅ Active | Icon library |
| uuid | ^11.0.3 | ✅ Active | Generate unique IDs (v4) |
| @supabase/supabase-js | ^2.99.1 | ✅ Active | Cloud database + Auth (cross-device sync) |
| react-router-dom | ^6.28.0 | ⚠️ UNUSED | Installed but never imported — candidate for removal |
| framer-motion | ^11.11.0 | ⚠️ UNUSED | Installed but never imported — CSS animations used instead |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| vite | Build tool & dev server |
| @vitejs/plugin-react | React fast refresh |
| vite-plugin-pwa | PWA manifest & service worker |
| typescript | Type checking |
| tailwindcss | Utility CSS framework |
| postcss / autoprefixer | CSS processing |
| @types/react, @types/react-dom, @types/uuid | TypeScript type definitions |

### Rules for Dependencies
- **Do NOT add new packages** without explicit user approval
- **Do NOT import** react-router-dom or framer-motion (they are unused, do not activate them)
- Icon library is `lucide-react` — use only icons already imported or from that library
- Date operations use `date-fns` — do not use `new Date()` math manually

---

## 3. PROJECT FILE STRUCTURE

```
Get Done/
├── APP_SPEC.md                    ← THIS FILE (keep updated)
├── index.html                     ← HTML entry point (title: "Get Done")
├── package.json                   ← Dependencies and scripts
├── package-lock.json
├── tsconfig.json                  ← TypeScript config (strict mode, @/ alias)
├── vite.config.ts                 ← Vite + PWA config
├── tailwind.config.js             ← Theme: primary red, surface dark grays
├── postcss.config.js
│
├── public/
│   ├── favicon.svg
│   ├── icon-192.png               ← PWA icon
│   └── icon-512.png               ← PWA icon
│
└── src/
    ├── main.tsx                   ← React root, StrictMode
    ├── App.tsx                    ← View router (switch on currentView)
    ├── index.css                  ← Global styles + Tailwind directives
    ├── vite-env.d.ts              ← Vite env type declarations
    │
    ├── types/
    │   └── index.ts               ← ALL type definitions (single source of truth)
    │
    ├── store/
    │   └── useStore.ts            ← Zustand store (state + all actions)
    │
    ├── components/
    │   ├── Layout.tsx             ← Outer shell (sidebar + main content + FAB + bottom nav)
    │   ├── Sidebar.tsx            ← Left nav (desktop fixed, mobile drawer)
    │   ├── BottomNav.tsx          ← Mobile-only bottom bar (4 buttons)
    │   ├── QuickAddButton.tsx     ← Floating Add (+) button
    │   ├── TaskItem.tsx           ← Single task row (checkbox, title, meta, actions)
    │   ├── TaskList.tsx           ← Task list container (active/completed separation)
    │   └── TaskEditor.tsx         ← Modal form for create/edit task
    │
    └── views/
        ├── TodayView.tsx          ← Overdue + today tasks
        ├── InboxView.tsx          ← Tasks with no project
        ├── UpcomingView.tsx       ← 14-day calendar view
        ├── ProjectView.tsx        ← Tasks by currentProjectId
        ├── HabitsView.tsx         ← Habit tracker + 7-day ring history
        ├── SearchView.tsx         ← Full-text task search
        ├── MatrixView.tsx         ← Eisenhower 4-quadrant view
        ├── GtdView.tsx            ← GTD 6-context view
        └── PomodoroView.tsx       ← Pomodoro timer + settings
```

### Rules for File Structure
- Do NOT create new files without a clear reason
- Do NOT move existing files to different directories
- New views go in `src/views/`
- New reusable components go in `src/components/`
- All types go in `src/types/index.ts`
- All state/actions go in `src/store/useStore.ts`

---

## 4. TYPESCRIPT TYPES & INTERFACES

All types are defined in `src/types/index.ts`. This is the single source of truth.

### Core Data Types

```typescript
// Priority: 1=urgent, 2=high, 3=medium, 4=low
type Priority = 1 | 2 | 3 | 4

type Quadrant =
  | 'urgent-important'
  | 'not-urgent-important'
  | 'urgent-not-important'
  | 'not-urgent-not-important'

type GtdContext =
  | 'inbox'
  | 'next-action'
  | 'waiting-for'
  | 'someday-maybe'
  | 'reference'
  | 'project-support'

type ViewType =
  | 'inbox' | 'today' | 'upcoming' | 'project'
  | 'label' | 'habits' | 'pomodoro' | 'matrix' | 'gtd' | 'search'
```

### Task Interface
```typescript
interface Task {
  id: string                        // uuid v4
  title: string                     // required, non-empty
  description: string               // optional, default ""
  completed: boolean                // default false
  priority: Priority                // default 4 (low)
  projectId: string | null          // null = inbox
  labelIds: string[]                // array of label IDs
  dueDate: string | null            // 'yyyy-MM-dd' format
  dueTime: string | null            // 'HH:mm' format — ⚠️ NOT IMPLEMENTED IN UI YET
  parentId: string | null           // for subtasks — ⚠️ NOT IMPLEMENTED IN UI YET
  order: number                     // for manual ordering
  createdAt: string                 // ISO timestamp
  completedAt: string | null        // ISO timestamp when completed
  recurring: RecurringConfig | null // ⚠️ NOT IMPLEMENTED IN UI YET
  quadrant: Quadrant | null         // for Eisenhower matrix
  gtdContext: GtdContext | null     // for GTD view
}
```

### Project Interface
```typescript
interface Project {
  id: string          // uuid v4
  name: string        // display name
  color: string       // hex color from PROJECT_COLORS
  icon: string        // emoji or icon string
  order: number       // sort order
  isFavorite: boolean // shown at top of sidebar if true
}
```

### Label Interface
```typescript
interface Label {
  id: string    // uuid v4
  name: string  // display name
  color: string // hex color
}
```

### Habit Interface
```typescript
interface Habit {
  id: string
  name: string
  icon: string         // emoji
  color: string        // hex color
  frequency: 'daily' | 'weekly' | 'custom'  // ⚠️ Only 'daily' used in UI
  customDays: number[] // 0=Sun, 6=Sat — ⚠️ NOT IMPLEMENTED IN UI YET
  targetCount: number  // times per day (default 1)
  completions: Record<string, number>  // key: 'yyyy-MM-dd', value: count
  createdAt: string    // ISO timestamp
  streak: number       // current streak
  bestStreak: number   // all-time best
  order: number        // sort order
}
```

### Recurring Config Interface
```typescript
interface RecurringConfig {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number       // every N days/weeks/months/years
  daysOfWeek?: number[]  // for weekly recurrence
}
```

### Pomodoro Interfaces
```typescript
interface PomodoroSession {
  id: string
  taskId: string | null
  startedAt: string
  duration: number
  type: 'work' | 'short-break' | 'long-break'
  completed: boolean
}

interface PomodoroSettings {
  workDuration: number             // default 25 (minutes)
  shortBreakDuration: number       // default 5
  longBreakDuration: number        // default 15
  sessionsBeforeLongBreak: number  // default 4
  autoStartBreak: boolean          // default false
  autoStartWork: boolean           // default false
}
```

### Constants (from `src/types/index.ts`)
```typescript
PROJECT_COLORS: string[]  // 19 hex colors
PRIORITY_COLORS: Record<Priority, string>  // Priority → Tailwind color class
PRIORITY_LABELS: Record<Priority, string>  // Priority → display name
QUADRANT_LABELS: Record<Quadrant, string>  // Quadrant → display name
GTD_LABELS: Record<GtdContext, string>     // GtdContext → display name
```

---

## 5. STATE MANAGEMENT (ZUSTAND STORE)

File: `src/store/useStore.ts`

### State Shape
```typescript
interface AppState {
  // Data collections
  tasks: Task[]
  projects: Project[]    // Defaults: [{name: "Personal"}, {name: "Work"}]
  labels: Label[]        // Defaults: [{name: "urgent"}, {name: "focus"}, {name: "quick-win"}]
  habits: Habit[]

  // UI state
  currentView: ViewType          // default: 'today'
  currentProjectId: string | null
  currentLabelId: string | null
  sidebarOpen: boolean           // default: false (controls mobile drawer)
  searchQuery: string
  showCompleted: boolean         // default: false

  // Feature settings
  pomodoroSettings: PomodoroSettings

  // Auth state (not persisted to localStorage)
  userId: string | null          // Supabase user ID; null = not signed in
  isAuthLoading: boolean         // true while checking session / loading data

  // Actions (functions — not persisted)
  addTask, updateTask, deleteTask, toggleTask, reorderTask
  addProject, updateProject, deleteProject
  addLabel, updateLabel, deleteLabel
  addHabit, updateHabit, deleteHabit, toggleHabitCompletion
  setView, toggleSidebar, setSearchQuery, setShowCompleted
  updatePomodoroSettings
  // Auth actions
  setUserId, setAuthLoading, loadFromSupabase, signOut
}
```

### Key Action Behaviors

**toggleHabitCompletion(id, date)**
- Increments completion count for date
- If count reaches targetCount → marks day complete
- Automatically recalculates streak and bestStreak
- Streak: counts consecutive completed days backward from yesterday

**deleteTask(id)**
- Also deletes all tasks where parentId === id (cascade)

**setView(view, projectId?, labelId?)**
- Updates currentView
- Optionally sets currentProjectId and currentLabelId

**toggleTask(id)**
- Flips completed boolean
- Sets completedAt to current ISO timestamp (or null when un-completing)

### Persistence
- Middleware: Zustand `persist`
- Storage key: `'get-done-storage'`
- Version: `1`
- All state is persisted except action functions

---

## 6. STORAGE & DATA PERSISTENCE

### Current Storage: Browser localStorage

**Key:** `get-done-storage`
**Format:** JSON string (auto-serialized by Zustand persist)
**When saved:** On every state change (automatic)
**When loaded:** On app start (automatic)

### What is Stored
- All tasks, projects, labels, habits
- All UI state (currentView, showCompleted, sidebarOpen, etc.)
- Pomodoro settings

### Storage Limitations
| Limitation | Detail |
|------------|--------|
| Single device only | No cross-device sync |
| No backup | Data lost if localStorage cleared |
| No multi-tab sync | Opening app in two tabs can cause conflicts |
| Browser limit | ~5-10MB (sufficient for personal use) |
| No versioning migration | Version 1 only, no upgrade logic |

### Database / Backend
**Status: CONNECTED — Supabase (PostgreSQL)**

| Detail | Value |
|--------|-------|
| Provider | Supabase (free tier) |
| Project URL | `https://vjcsqnzpqcdfguqezvop.supabase.co` |
| Credentials file | `.env` (gitignored — `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`) |
| Client library | `@supabase/supabase-js@^2.99.1` |
| Client module | `src/lib/supabase.ts` |
| Auth | Supabase Auth (email + password) |

**Sync strategy:**
- Zustand `persist` (localStorage) remains as offline cache
- Every CRUD action fires a fire-and-forget Supabase upsert/delete after updating local state
- On sign-in: `loadFromSupabase(userId)` pulls all user data from Supabase (authoritative source)
- On first sign-up (no Supabase data): existing local data bulk-migrated via `migrateLocalDataToSupabase()`
- `partialize` in persist config excludes `userId` and `isAuthLoading` from localStorage

**New files:**
- `src/lib/supabase.ts` — Supabase client, type converters (camelCase ↔ snake_case), sync helpers
- `src/components/AuthView.tsx` — Email/password sign-in / sign-up screen

---

### Supabase Schema Design

**Platform:** Supabase (PostgreSQL + Auth + Realtime)
**Free Tier:** Yes — sufficient for personal use (500MB DB, unlimited API requests)
**Auth:** Supabase Auth (email/password or Google OAuth)
**Sync Strategy:** Replace localStorage persist with Supabase reads/writes per action; keep localStorage as offline cache
**Data Safety:** All mutations use `upsert` (INSERT ... ON CONFLICT DO UPDATE) — existing data is never silently overwritten or lost

#### Tables Overview

| Table | Description | Key |
|-------|-------------|-----|
| `projects` | User projects | `id` (uuid) |
| `labels` | User labels/tags | `id` (uuid) |
| `tasks` | All tasks | `id` (uuid) |
| `habits` | Habit definitions + completions | `id` (uuid) |
| `pomodoro_settings` | Per-user Pomodoro config | `user_id` (PK) |
| `user_preferences` | Sync-able UI state | `user_id` (PK) |

> `auth.users` is managed automatically by Supabase Auth — do not create it manually.

---

#### Full SQL Schema

```sql
-- =============================================
-- GET DONE — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE
-- =============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── PROJECTS ─────────────────────────────────
create table if not exists public.projects (
  id            uuid        primary key default uuid_generate_v4(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  name          text        not null,
  color         text        not null,
  icon          text        not null default '',
  "order"       integer     not null default 0,
  is_favorite   boolean     not null default false,
  created_at    timestamptz not null default now()
);

-- ── LABELS ───────────────────────────────────
create table if not exists public.labels (
  id            uuid        primary key default uuid_generate_v4(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  name          text        not null,
  color         text        not null,
  created_at    timestamptz not null default now()
);

-- ── TASKS ────────────────────────────────────
create table if not exists public.tasks (
  id            uuid        primary key default uuid_generate_v4(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  title         text        not null,
  description   text        not null default '',
  completed     boolean     not null default false,
  priority      smallint    not null default 4
                            check (priority in (1, 2, 3, 4)),
  project_id    uuid        references public.projects(id) on delete set null,
  label_ids     uuid[]      not null default '{}',
  due_date      date,
  due_time      time,
  parent_id     uuid        references public.tasks(id) on delete cascade,
  "order"       integer     not null default 0,
  created_at    timestamptz not null default now(),
  completed_at  timestamptz,
  recurring     jsonb,
  quadrant      text        check (quadrant in (
                  'urgent-important',
                  'not-urgent-important',
                  'urgent-not-important',
                  'not-urgent-not-important'
                )),
  gtd_context   text        check (gtd_context in (
                  'inbox', 'next-action', 'waiting-for',
                  'someday-maybe', 'reference', 'project-support'
                ))
);

-- ── HABITS ───────────────────────────────────
create table if not exists public.habits (
  id            uuid        primary key default uuid_generate_v4(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  name          text        not null,
  icon          text        not null default '',
  color         text        not null,
  frequency     text        not null default 'daily'
                            check (frequency in ('daily', 'weekly', 'custom')),
  custom_days   integer[]   not null default '{}',
  target_count  integer     not null default 1,
  completions   jsonb       not null default '{}',
  created_at    timestamptz not null default now(),
  streak        integer     not null default 0,
  best_streak   integer     not null default 0,
  "order"       integer     not null default 0
);

-- ── POMODORO SETTINGS (one row per user) ─────
create table if not exists public.pomodoro_settings (
  user_id                    uuid    primary key references auth.users(id) on delete cascade,
  work_duration              integer not null default 25,
  short_break_duration       integer not null default 5,
  long_break_duration        integer not null default 15,
  sessions_before_long_break integer not null default 4,
  auto_start_break           boolean not null default false,
  auto_start_work            boolean not null default false,
  updated_at                 timestamptz not null default now()
);

-- ── USER PREFERENCES (sync-able UI state) ────
create table if not exists public.user_preferences (
  user_id        uuid    primary key references auth.users(id) on delete cascade,
  show_completed boolean not null default false,
  updated_at     timestamptz not null default now()
);

-- =============================================
-- ROW LEVEL SECURITY — Users see only their data
-- =============================================

alter table public.projects         enable row level security;
alter table public.labels           enable row level security;
alter table public.tasks            enable row level security;
alter table public.habits           enable row level security;
alter table public.pomodoro_settings enable row level security;
alter table public.user_preferences  enable row level security;

-- Projects RLS
create policy "users_own_projects"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Labels RLS
create policy "users_own_labels"
  on public.labels for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Tasks RLS
create policy "users_own_tasks"
  on public.tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Habits RLS
create policy "users_own_habits"
  on public.habits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Pomodoro Settings RLS
create policy "users_own_pomodoro_settings"
  on public.pomodoro_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- User Preferences RLS
create policy "users_own_preferences"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================
-- INDEXES — Speed up common queries
-- =============================================

create index if not exists idx_tasks_user_id      on public.tasks(user_id);
create index if not exists idx_tasks_project_id   on public.tasks(project_id);
create index if not exists idx_tasks_due_date     on public.tasks(due_date);
create index if not exists idx_tasks_completed    on public.tasks(completed);
create index if not exists idx_projects_user_id   on public.projects(user_id);
create index if not exists idx_labels_user_id     on public.labels(user_id);
create index if not exists idx_habits_user_id     on public.habits(user_id);
```

---

#### Column-to-TypeScript Mapping

| Supabase Column | TypeScript Field | Notes |
|-----------------|-----------------|-------|
| `tasks.priority` | `Task.priority` | `smallint` 1–4 |
| `tasks.label_ids` | `Task.labelIds` | `uuid[]` array |
| `tasks.due_date` | `Task.dueDate` | stored as `date`, app uses `'yyyy-MM-dd'` string |
| `tasks.due_time` | `Task.dueTime` | stored as `time`, app uses `'HH:mm'` string |
| `tasks.recurring` | `Task.recurring` | `jsonb` → `RecurringConfig \| null` |
| `tasks.completed_at` | `Task.completedAt` | `timestamptz` → ISO string |
| `tasks.quadrant` | `Task.quadrant` | `text` with CHECK constraint |
| `tasks.gtd_context` | `Task.gtdContext` | `text` with CHECK constraint |
| `habits.completions` | `Habit.completions` | `jsonb` → `Record<string, number>` |
| `habits.custom_days` | `Habit.customDays` | `integer[]` |
| `projects.is_favorite` | `Project.isFavorite` | `boolean` |

#### Data Safety Rules (Implementation)
- **Never DELETE and re-INSERT** — always use `upsert` to preserve data
- **Migrations**: add columns with `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` (non-destructive)
- **Offline**: keep Zustand persist as local cache; sync to Supabase on reconnect
- **Conflict resolution**: Supabase `updated_at` timestamp wins (last-write-wins per row)

### Data Export/Import
**Status: NOT IMPLEMENTED**
No export or import functionality exists yet.

---

## 7. COMPONENTS REFERENCE

### Layout (`src/components/Layout.tsx`)
**Role:** Outer shell of the app
**Renders:** Sidebar + main content + QuickAddButton + BottomNav
**Props:** `{ children: ReactNode }`
**Behavior:**
- Sidebar is fixed on desktop (`lg:block`)
- On mobile, sidebar is a slide-in drawer (controlled by `sidebarOpen`)
- Backdrop overlay when sidebar open on mobile (click to close)
- Main content has `pb-20` bottom padding for mobile bottom nav clearance

### Sidebar (`src/components/Sidebar.tsx`)
**Role:** Primary navigation
**Props:** none (reads from useStore)
**Sections:**
- Logo + app title
- Search button → sets view to 'search'
- Main nav: Inbox, Today, Upcoming
- Collapsible "Tools": Habits, Pomodoro, Matrix, GTD
- Collapsible "Projects": list + add new project button
- Collapsible "Labels": list — ⚠️ label click calls `setView('label', labelId)` but LabelView does not exist

### BottomNav (`src/components/BottomNav.tsx`)
**Role:** Mobile-only bottom navigation
**Props:** none
**Items:** Today, Inbox, Search, Menu (toggles sidebar)
**Visibility:** Hidden on `lg:` and above

### QuickAddButton (`src/components/QuickAddButton.tsx`)
**Role:** Floating action button (+)
**Position:** Bottom-right, fixed
**Behavior:** Opens TaskEditor modal with no defaults

### TaskItem (`src/components/TaskItem.tsx`)
**Props:** `{ task: Task, showProject?: boolean }`
**Renders:**
- Priority-colored checkbox border
- Title (line-through when completed)
- Description snippet (if exists)
- Due date (red if overdue)
- Project indicator dot (if showProject && projectId)
- Labels chips
- Hover: Edit and Delete buttons
- Mobile: 3-dot menu with Edit/Delete
**Behavior:**
- Click checkbox → toggleTask(id)
- Click row → opens TaskEditor
- Overdue = `dueDate < today && !completed`

### TaskList (`src/components/TaskList.tsx`)
**Props:** `{ tasks: Task[], showProject?: boolean, emptyMessage?: string }`
**Behavior:**
- Splits into active (sorted by .order) and completed (sorted by .completedAt desc)
- Shows "No tasks" empty state if no active tasks
- "Show completed (N)" toggle at bottom
- Respects `showCompleted` from store

### TaskEditor (`src/components/TaskEditor.tsx`)
**Props:**
```typescript
{
  task?: Task                     // if provided, editing mode
  onClose: () => void
  defaultProjectId?: string | null
  defaultDueDate?: string
  defaultQuadrant?: Quadrant
  defaultGtdContext?: GtdContext
}
```
**Fields:** title (required), description, due date, priority (1-4), project, labels (multi-select)
**Behavior:**
- Auto-focuses title input on open
- Validates: title must not be empty
- On save: calls addTask or updateTask
- On backdrop click or Cancel button: calls onClose

---

## 8. VIEWS REFERENCE

### TodayView (`src/views/TodayView.tsx`)
**ViewType:** `'today'`
**Logic:**
- Shows tasks where `dueDate <= today`
- Separates overdue (dueDate < today) and today (dueDate === today)
- "Add task" pre-fills dueDate with today

### InboxView (`src/views/InboxView.tsx`)
**ViewType:** `'inbox'`
**Logic:**
- Shows tasks where `projectId === null`

### UpcomingView (`src/views/UpcomingView.tsx`)
**ViewType:** `'upcoming'`
**Logic:**
- Shows 14-day scrollable date picker (today + 13 days)
- Overdue section always at top
- Shows tasks for selected date
- "Add task" pre-fills selected date

### ProjectView (`src/views/ProjectView.tsx`)
**ViewType:** `'project'`
**Logic:**
- Filters tasks by `task.projectId === currentProjectId`
- Editable project name inline
- Options: rename, favorite, change color (19 colors), delete
- Delete warns and redirects to inbox

### HabitsView (`src/views/HabitsView.tsx`)
**ViewType:** `'habits'`
**Logic:**
- Shows all habits
- 7 SVG circle rings per habit (last 7 days, newest on right)
- Ring fill = completed days / targetCount (stroke-dasharray)
- Click ring = toggle that day's completion
- Add/Edit modal: name, icon (emoji), color, targetCount
- Current streak + best streak displayed
- ⚠️ Frequency always set to 'daily' — no UI for weekly/custom

### SearchView (`src/views/SearchView.tsx`)
**ViewType:** `'search'`
**Logic:**
- Auto-focused search input
- Filters all tasks by title + description (case-insensitive)
- Shows result count
- Empty state with icon

### MatrixView (`src/views/MatrixView.tsx`)
**ViewType:** `'matrix'`
**Logic:**
- 4 cells: Do First, Schedule, Delegate, Eliminate
- Each cell filters tasks by `task.quadrant`
- Inline delete button on tasks
- "Add" button per quadrant pre-fills quadrant in TaskEditor

### GtdView (`src/views/GtdView.tsx`)
**ViewType:** `'gtd'`
**Logic:**
- 6 context tabs: inbox, next-action, waiting-for, someday-maybe, reference, project-support
- Filters tasks by `task.gtdContext`
- Dropdown on each task to move between contexts
- Shows workflow tip for inbox context

### PomodoroView (`src/views/PomodoroView.tsx`)
**ViewType:** `'pomodoro'`
**Logic:**
- Phases: work → short-break → [every 4th: long-break]
- Circular SVG progress indicator
- Session counter (dots, 4 max before long break)
- Task selector dropdown (optional)
- Settings modal: all PomodoroSettings fields
- ⚠️ No audio/desktop notifications
- ⚠️ No session history stored in state

---

## 9. ROUTING SYSTEM

**Type:** State-based view switching (NOT React Router)

**How it works:**
1. `currentView` in Zustand store holds the active view name
2. `App.tsx` renders the matching view component via switch statement
3. Navigation calls `setView(viewType, projectId?, labelId?)`

**View Map in App.tsx:**
```typescript
switch (currentView) {
  case 'today':    return <TodayView />
  case 'inbox':    return <InboxView />
  case 'upcoming': return <UpcomingView />
  case 'project':  return <ProjectView />
  case 'habits':   return <HabitsView />
  case 'pomodoro': return <PomodoroView />
  case 'matrix':   return <MatrixView />
  case 'gtd':      return <GtdView />
  case 'search':   return <SearchView />
  // ⚠️ 'label' case is MISSING — will fall to default
  default:         return <TodayView />  // fallback
}
```

**Rules:**
- Do NOT add React Router unless explicitly requested by user
- Add new views by: creating file in `src/views/`, adding case to App.tsx switch, adding to ViewType in types/index.ts
- URL does not change on navigation (no deep linking currently)

---

## 10. STYLING SYSTEM

### Framework: Tailwind CSS v3

### Theme Configuration (`tailwind.config.js`)

**Primary (Purple — action color):**
- `primary-600`: `#800080` (main action color, buttons, checkboxes — DEFAULT shade)
- `primary-500`: `#a020a0` (lighter purple)
- `primary-700`: `#650065` (darker purple)

**Surface (Dark grays — backgrounds):**
- `surface-50`: `#fafafa` (near-white text)
- `surface-100`: `#f5f5f5`
- `surface-200`: `#e5e5e5`
- `surface-300`: `#d4d4d4`
- `surface-400`: `#a3a3a3`
- `surface-500`: `#737373` (muted text)
- `surface-600`: `#525252`
- `surface-700`: `#404040`
- `surface-800`: `#262626` (cards, modals)
- `surface-900`: `#171717` (main background)

### Custom CSS (`src/index.css`)
- `@keyframes slideUp` — modal entrance animation (0px → -10px, opacity 0→1)
- `@keyframes fadeIn` — overlay entrance
- `@keyframes scaleIn` — zoom entrance
- `.modal-backdrop` — fixed inset overlay, `bg-black/60`, z-50
- `.habit-ring` — SVG circle transition class
- `.timer-circle` — SVG timer transition class
- `.swipe-container` — CSS class for swipe gestures (⚠️ no JS handler implemented)
- `safe-area-*` — CSS variables for mobile notch handling

### Design Rules
- Background: always `surface-900` (`#171717`)
- Cards/Modals: `surface-800` (`#262626`)
- Borders: `surface-700` (`#404040`) — subtle
- Body text: `surface-50` or `surface-100`
- Muted text: `surface-400` or `surface-500`
- Action buttons: `primary` color
- No light mode — dark theme only
- Font: system font stack (defined in tailwind config)

---

## 11. KNOWN BUGS & ISSUES

### 🔴 Critical (Will Crash or Break)

| # | Issue | File | Impact |
|---|-------|------|--------|
| C1 | **LabelView missing** — `setView('label')` is called in Sidebar but no `<LabelView>` exists. App falls to default (TodayView) silently but clicking a label does nothing useful. | `App.tsx`, `Sidebar.tsx` | Clicking label nav item = broken |
| C2 | **No error boundaries** — Any unhandled JS error crashes entire app with white screen | All files | Crash with no recovery |
| C3 | **No localStorage error handling** — If localStorage is full or disabled, app crashes silently | `useStore.ts` | Data loss |

### 🟡 Medium (Feature Gaps / Incorrect Behavior)

| # | Issue | File | Impact |
|---|-------|------|--------|
| M1 | **Habit frequency hardcoded to 'daily'** — `frequency` field supports weekly/custom but UI always sets daily | `HabitsView.tsx` | Weekly/custom habits impossible |
| M2 | **Recurring tasks have no logic** — `RecurringConfig` type exists, no UI, no auto-generation | `types/index.ts` | Feature non-functional |
| M3 | **Subtasks have no UI** — `parentId` exists, only used for cascade delete | `useStore.ts` | Feature non-functional |
| M4 | **dueTime field never used** — Task has dueTime but it's never set, displayed, or used for sorting | `TaskEditor.tsx`, `TaskItem.tsx` | Wasted field |
| M5 | **Overdue logic inconsistent** — `TaskItem` uses `isPast()` from date-fns; `TodayView` uses string comparison | `TaskItem.tsx`, `TodayView.tsx` | Inconsistent behavior |
| M6 | **No duplicate habit name validation** | `HabitsView.tsx` | UX confusion |
| M7 | **HabitsView color picker only shows 12 colors** (not 19 like ProjectView) | `HabitsView.tsx` | Inconsistent |

### 🟢 Minor (Polish / UX)

| # | Issue | File | Impact |
|---|-------|------|--------|
| N1 | **No Escape key to close modals** | `TaskEditor.tsx`, `HabitsView.tsx` | UX friction |
| N2 | **No swipe gesture handler** despite `.swipe-container` CSS class | `index.css`, Layout | Misleading |
| N3 | **React-router-dom and framer-motion installed but unused** | `package.json` | Bundle bloat (~40KB) |
| N4 | **No keyboard shortcut for quick add** | App-wide | Power user friction |
| N5 | **No aria-labels on icon buttons** | All components | Accessibility |
| N6 | **Focus not trapped in modals** | `TaskEditor.tsx` | Accessibility |
| N7 | **Pomodoro has no notification sound** | `PomodoroView.tsx` | Breaks focus flow |

---

## 12. PRIORITIZED IMPROVEMENTS ROADMAP

### Phase 1 — Fix Critical Bugs (Do First)

| Priority | Task | Why |
|----------|------|-----|
| P1 | Implement `LabelView` component | Fixes broken label navigation |
| P1 | Add `case 'label': return <LabelView />` to App.tsx | Required for label routing |
| P1 | Add error boundary in `main.tsx` | Prevents white screen of death |
| P2 | Fix overdue date logic to be consistent | Use same method in all files |
| P2 | Add try-catch to localStorage operations | Prevents storage crash |

### Phase 2 — Remove Waste

| Priority | Task | Why |
|----------|------|-----|
| P1 | Remove `react-router-dom` from package.json | Unused, adds bundle size |
| P1 | Remove `framer-motion` from package.json | Unused, ~40KB waste |

### Phase 3 — Complete Partial Features

| Priority | Task | Why |
|----------|------|-----|
| P1 | Add due time UI in TaskEditor | Field exists, never used |
| P2 | Add habit frequency selector (daily/weekly) | Foundation exists in types |
| P2 | Add subtask UI (create + display children) | parentId exists in types |
| P3 | Add recurring task UI + auto-generation | RecurringConfig exists |

### Phase 4 — Core Missing Features

| Priority | Task | Why |
|----------|------|-----|
| P1 | Add Escape key handler to close all modals | Standard UX expectation |
| P1 | Add Pomodoro notification (audio or browser notification API) | Core Pomodoro feature |
| P2 | Add data export (JSON download) | Data safety / portability |
| P2 | Add keyboard shortcut for quick-add task | Power user productivity |
| P2 | Add React.memo() on TaskItem and TaskList | Performance for 100+ tasks |
| P3 | Add advanced search filters (project, priority, date) | Better searchability |
| P3 | Add batch select + delete/move | Productivity boost |
| P3 | Add priority filter toggle in views | Missing filter |

### Phase 5 — Backend / Sync ✅ COMPLETE

| Priority | Task | Status |
|----------|------|--------|
| P1 | Install `@supabase/supabase-js` | ✅ Done (`^2.99.1`) |
| P1 | Create `src/lib/supabase.ts` | ✅ Done |
| P1 | Add auth (email/password via Supabase Auth) | ✅ Done (`AuthView.tsx`) |
| P1 | Migrate `useStore.ts` actions to write to Supabase (upsert pattern) | ✅ Done |
| P2 | Add real-time subscriptions (Supabase Realtime) for cross-tab sync | Not yet implemented |
| P3 | Add data backup/restore | Not yet implemented |

### Phase 6 — Polish & Power Features

| Priority | Task | Why |
|----------|------|-----|
| P2 | Add drag-to-reorder tasks within views | Better organization UX |
| P2 | Add drag tasks between Eisenhower quadrants | Natural Matrix UX |
| P3 | Add light mode toggle | User preference |
| P3 | Add analytics/insights (tasks completed per week, habit stats) | Motivation |
| P3 | Add onboarding / empty state tips | New user UX |
| P3 | Add keyboard navigation & shortcuts reference | Power users |

---

## 13. AI AGENT RULES & CONSTRAINTS

### Mandatory Pre-Task Actions
1. Read `APP_SPEC.md` completely before doing ANYTHING
2. Understand the current state of the feature you are working on
3. Check the Known Bugs section (§11) — don't re-introduce fixed bugs
4. Confirm which files will be modified before modifying them

### Mandatory Post-Task Actions
1. Update §14 Change Log with what you did
2. Update §11 Known Bugs — remove fixed bugs, add any new ones discovered
3. Update the relevant section if you add/change types, components, views, or routes
4. Do NOT leave APP_SPEC.md out of date
5. **Push all changes to the GitHub repository on the `main` branch** (see §15 Git & Repository)

### What You MUST NOT Do
- Do NOT add new npm packages without explicit user permission
- Do NOT import or use `react-router-dom` or `framer-motion` (they are installed but excluded)
- Do NOT change the routing system from state-based to URL-based unless user asks
- Do NOT change the storage system from localStorage unless user asks and provides credentials
- Do NOT change Tailwind theme colors without user approval
- Do NOT add features not requested (no "while I'm here" additions)
- Do NOT refactor code not related to your task
- Do NOT add comments or docstrings to unchanged code
- Do NOT change file structure without user approval
- Do NOT create new files unless absolutely necessary
- Do NOT change existing type interfaces unless required by the task

### What You MUST Follow
- All types must go in `src/types/index.ts`
- All state/actions must go in `src/store/useStore.ts`
- New views must be registered in `App.tsx` switch AND `ViewType` in `src/types/index.ts`
- Dates must use `date-fns` functions (format, parseISO, isToday, isPast, etc.)
- IDs must use `uuidv4()` from the `uuid` package
- Colors for projects must use `PROJECT_COLORS` constant
- Styling: Tailwind utility classes first, custom CSS only if Tailwind can't do it
- Dark theme only — never add `bg-white` or light-colored backgrounds to main UI elements
- Keep components and views as functional components with React hooks

### Pattern Consistency Rules
- IDs: always `uuidv4()`
- Dates stored as: `'yyyy-MM-dd'` string (not Date objects, not timestamps)
- Timestamps stored as: ISO string `new Date().toISOString()`
- State mutations: always return new arrays/objects (immutable pattern)
- No `console.log` in production code (use only for debugging, remove before commit)
- Modal structure: `.modal-backdrop` div wrapping a centered card div

### Adding a New View Checklist
- [ ] Create `src/views/NewView.tsx`
- [ ] Add `'new-view'` to `ViewType` union in `src/types/index.ts`
- [ ] Add `case 'new-view': return <NewView />` in `App.tsx`
- [ ] Add navigation button in `Sidebar.tsx`
- [ ] Add to BottomNav if it's a primary view
- [ ] Update this file (§8, §9, §14)

### Adding a New Component Checklist
- [ ] Create `src/components/NewComponent.tsx`
- [ ] Define props interface inline (small) or in `types/index.ts` (complex)
- [ ] Use Tailwind classes for all styling
- [ ] Update this file (§7, §14)

### Adding a New Field to Task Checklist
- [ ] Add field to `Task` interface in `src/types/index.ts`
- [ ] Add handling in `addTask` and `updateTask` in `useStore.ts`
- [ ] Add UI in `TaskEditor.tsx`
- [ ] Add display in `TaskItem.tsx` (if visible)
- [ ] Update §4 and §7 in this file
- [ ] Update §14 Change Log

---

## 14. GIT & REPOSITORY

### Repository Details

| Field | Value |
|-------|-------|
| Remote URL | `https://github.com/ajmal-repo/get_done` |
| Default branch | `main` |
| Initialized | 2026-03-14 |

### Git Rules for AI Agents

> ⚠️ **MANDATORY:** After completing ANY task, you MUST commit and push all changes to `main`.

**Push workflow (run after every completed task):**
```
git add <changed files>   ← stage only relevant files (never use git add -A blindly)
git commit -m "..."       ← descriptive message, include Co-Authored-By footer
git push origin main      ← always push to main
```

**Rules:**
- Always push to `main` — never create other branches unless explicitly asked
- Never push `.env` (it is gitignored — contains Supabase credentials)
- Never push `node_modules/`, `dist/`, `.claude/`
- Commit message must describe what changed and why
- Always include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` in commit footer
- If the repo has no remote yet: `git remote add origin https://github.com/ajmal-repo/get_done.git`
- If the local repo is not initialized: `git init && git checkout -b main` first

---

## 15. CHANGE LOG

All changes to the application must be recorded here.

| Date | Version | Changed By | Description |
|------|---------|------------|-------------|
| 2026-03-14 | 1.0.0 | Initial Analysis | APP_SPEC.md created. Full codebase analysis documented. All types, store, components, views, bugs, and roadmap captured. |
| 2026-03-14 | 1.1.0 | AI Agent | Changed primary color from red (`#dc4c3e`) to purple (`#800080`) in `tailwind.config.js`. Updated §1 and §10 to reflect new color. Added full Supabase schema design to §6 (6 tables, RLS policies, indexes, column mapping, data-safety rules). Updated §12 Phase 5 roadmap with implementation steps. No backend code implemented — awaiting user-provided Supabase credentials. |
| 2026-03-14 | 1.2.0 | AI Agent | Implemented Supabase cloud sync. Installed `@supabase/supabase-js@^2.99.1`. Created `src/lib/supabase.ts` (client, camelCase↔snake_case converters, fire-and-forget sync helpers, bulk migration). Created `src/components/AuthView.tsx` (email/password sign-in/sign-up). Updated `src/store/useStore.ts`: added `userId`, `isAuthLoading`, `setUserId`, `setAuthLoading`, `loadFromSupabase`, `signOut`; all CRUD actions now sync to Supabase; `partialize` excludes auth state from localStorage. Updated `src/App.tsx`: auth gate (loading spinner → AuthView → main app), session check on mount, `onAuthStateChange` listener. Updated `vite.config.ts` PWA `theme_color` to `#800080`. Created `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` (gitignored). Updated §2, §6 to reflect new status. |

---

*End of APP_SPEC.md — Keep this file updated after every AI-assisted change.*
