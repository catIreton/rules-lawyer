import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbProps {
  crumbs: Crumb[]
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
