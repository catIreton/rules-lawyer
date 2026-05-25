'use client'

import { useEffect } from 'react'

const STORAGE_KEY = 'rules-lawyer:recently-viewed'
const MAX_ITEMS = 5

export default function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const prev: string[] = raw ? JSON.parse(raw) : []
      const updated = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
  }, [slug])

  return null
}
