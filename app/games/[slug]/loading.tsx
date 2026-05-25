export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse space-y-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48" />
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="flex gap-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${70 + (i % 3) * 10}%` }} />
        ))}
      </div>
    </div>
  )
}
