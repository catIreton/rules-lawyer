const colors: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  Expert: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
}

export function getDifficultyColor(difficulty: string): string {
  return colors[difficulty] ?? 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
}
