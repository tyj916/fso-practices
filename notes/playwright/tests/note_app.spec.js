const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({page}) => {
    await page.getByRole('button', { name: 'Login' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('root')
    await textboxes[1].fill('salainen')

    // await page.getByLabel('username').fill('root')
    // await page.getByLabel('password').fill('salaimen')

    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Superuser logged in')).toBeVisible()
  })
})

