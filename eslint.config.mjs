import coreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // react-hooks v7 flags setState-in-effect, but these are intentional patterns:
      // ThemeToggle uses the SSR hydration guard, RecentlyViewed initialises from localStorage.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default eslintConfig
