import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">404 — Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400">
        That page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        Back to all games
      </Link>
    </div>
  )
}
