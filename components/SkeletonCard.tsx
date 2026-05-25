export default function SkeletonCard() {
  return (
    <div
      className="flex flex-col animate-pulse"
      aria-hidden="true"
    >
      {/* Box art header skeleton */}
      <div className="h-28 bg-gradient-to-br from-stone-300 to-stone-400 dark:from-stone-700 dark:to-stone-800 p-4 flex flex-col justify-end gap-1.5">
        <div className="h-2.5 bg-white/30 rounded w-1/3" />
        <div className="h-4 bg-white/30 rounded w-3/4" />
      </div>

      {/* Body skeleton */}
      <div className="flex-1 bg-amber-50 dark:bg-stone-900 px-4 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-stone-200 dark:bg-stone-700 rounded-full w-16" />
          <div className="flex gap-3">
            <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-12" />
            <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-14" />
          </div>
        </div>
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-full" />
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-4/5" />
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-1 px-4 pb-4 pt-2 bg-amber-50 dark:bg-stone-900">
        <div className="h-5 bg-amber-200 dark:bg-stone-700 rounded-full w-12" />
        <div className="h-5 bg-amber-200 dark:bg-stone-700 rounded-full w-16" />
        <div className="h-5 bg-amber-200 dark:bg-stone-700 rounded-full w-10" />
      </div>
    </div>
  )
}
