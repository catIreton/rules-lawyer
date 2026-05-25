import SkeletonCard from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="h-10 bg-amber-100 dark:bg-stone-800 rounded-lg w-80 mx-auto animate-pulse" />
        <div className="h-5 bg-amber-100 dark:bg-stone-800 rounded w-96 mx-auto animate-pulse" />
      </div>
      <div className="h-12 bg-amber-100 dark:bg-stone-800 rounded-xl max-w-2xl mx-auto animate-pulse" />
      <div className="bg-gradient-to-b from-sky-600 to-sky-700 dark:from-sky-700 dark:to-sky-800 rounded-lg p-5 shadow-[0_8px_0_#082f49,0_16px_32px_rgba(0,0,0,0.45)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-sm">
              <SkeletonCard />
              <div className="absolute inset-0 pointer-events-none rounded-sm shadow-[inset_0_8px_20px_rgba(0,0,0,0.22),inset_4px_0_8px_rgba(0,0,0,0.08),inset_-4px_0_8px_rgba(0,0,0,0.06)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
