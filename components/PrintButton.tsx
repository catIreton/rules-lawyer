'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
    >
      🖨 Print / Save as PDF
    </button>
  )
}
