const categoryColors: Record<string, string> = {
  'Card Drafting': 'from-violet-600 to-indigo-700',
  'Abstract': 'from-teal-500 to-emerald-700',
  'Strategy': 'from-emerald-600 to-green-800',
  'Cooperative': 'from-rose-500 to-red-700',
  'Family Strategy': 'from-amber-400 to-orange-600',
  'Engine Building': 'from-blue-600 to-sky-800',
}

const fallbackPalette = [
  'from-purple-600 to-fuchsia-700',
  'from-cyan-600 to-blue-700',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
]

export function getCategoryColor(category: string): string {
  const preset = categoryColors[category]
  if (preset) return preset
  return fallbackPalette[category.length % fallbackPalette.length]
}
