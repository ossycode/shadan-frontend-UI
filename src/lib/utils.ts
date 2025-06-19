import { Column } from "@/components/KanbanBoard";
import { Post } from "@/types/post";
import { clsx, type ClassValue } from "clsx";
import { format, isValid, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PostWithDateKey = Post & { dateKey: string };

export function groupByDateKeyIntoColumns(
  posts: (Post & { dateKey: string })[]
): Column[] {
  // group into a map
  const map: Record<string, Post[]> = {};
  for (const p of posts) {
    (map[p.dateKey] ||= []).push(p);
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKey, group]) => {
      const iso = parseISO(dateKey);
      const title = isValid(iso) ? format(iso, "MMM d") : dateKey; // fall back if somehow bad
      return {
        id: dateKey,
        title,
        count: group.length,
        posts: group,
      };
    });
}
const STORAGE_KEY = "kanban-columns";

export const loadColumns = (): Column[] | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const saveColumns = (columns: Column[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
};

export const seedColumnsIfEmpty = (defaultData: Column[]) => {
  const stored = loadColumns();
  if (!stored) {
    saveColumns(defaultData);
    return defaultData;
  }
  return stored;
};

export function generateCalendarGrid(base: Date): Date[] {
  // 1st of month
  const firstOfMonth = new Date(base.getFullYear(), base.getMonth(), 1);
  // JS: 0=Sun…6=Sat → we want Mon=0…Sun=6
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  // back up to that Monday
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startOffset);

  // build 6×7 = 42 days
  return Array.from({ length: 42 }).map((_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}
