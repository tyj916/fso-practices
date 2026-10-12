const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)

  /** other ways to fill in the form */
  // const textboxes = await page.getByRole('textbox').all()
  // await textboxes[0].fill('mluukkai')
  // await textboxes[1].fill('salainen')

  // await page.getByLabel('username').fill('mluukkai')
  // await page.getByLabel('password').fill('salaimen')

  await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(content).waitFor()
}

export { loginWith, createNote }
