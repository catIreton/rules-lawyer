import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads and displays the hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /search/i })).toBeVisible()
  })

  test('displays game cards on load', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('game-card').first()).toBeVisible()
  })

  test('filters games when searching', async ({ page }) => {
    await page.goto('/')
    const initialCount = await page.getByTestId('game-card').count()
    expect(initialCount).toBeGreaterThan(1)

    await page.getByRole('textbox', { name: /search/i }).fill('catan')
    await expect(page.getByText('Catan')).toBeVisible()

    const filteredCount = await page.getByTestId('game-card').count()
    expect(filteredCount).toBeLessThan(initialCount)
  })

  test('clears search and restores all games', async ({ page }) => {
    await page.goto('/')
    const initialCount = await page.getByTestId('game-card').count()

    await page.getByRole('textbox', { name: /search/i }).fill('catan')
    await page.getByLabel('Clear search').click()

    await expect(page.getByTestId('game-card')).toHaveCount(initialCount)
  })

  test('shows empty state for unmatched search', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('textbox', { name: /search/i }).fill('zzzzzzzzzzz')
    await expect(page.getByText(/no games match/i)).toBeVisible()
  })
})

test.describe('Game detail page', () => {
  test('navigates to a game page from the home page', async ({ page }) => {
    await page.goto('/')
    // Cards are <article> elements — click the block link inside the first card
    await page.getByTestId('game-card').first().locator('a').first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible()
  })

  test('breadcrumb home link returns to home page', async ({ page }) => {
    await page.goto('/games/catan')
    await page.getByRole('navigation', { name: /breadcrumb/i }).getByRole('link').click()
    await expect(page).toHaveURL('/')
  })

  test('game page shows metadata badges', async ({ page }) => {
    await page.goto('/games/catan')
    await expect(page.getByText(/players/i)).toBeVisible()
  })

  test('returns 404 for unknown game slug', async ({ page }) => {
    const response = await page.goto('/games/not-a-real-game')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Tag pages', () => {
  test('tag link on a card navigates to the tag page', async ({ page }) => {
    await page.goto('/games/catan')
    const tagLink = page.locator('a[href^="/tags/"]').first()
    const tagText = await tagLink.textContent()
    await tagLink.click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(tagText?.trim() ?? '')
  })
})

test.describe('Accessibility', () => {
  test('search input is keyboard accessible', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const focused = page.getByRole('textbox', { name: /search/i })
    await focused.type('catan')
    await expect(page.getByText('Catan')).toBeVisible()
  })
})
