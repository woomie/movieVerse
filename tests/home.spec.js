// home.spec.js
const { test, expect } = require('@playwright/test');

test('homepage loads and displays movies', async ({ page }) => {
  // Go to your homepage
  await page.goto('http://localhost:3000/'); 

 
  await expect(page).toHaveTitle(/Movie/i);


  const movieCards = await page.locator('.movie-card'); 
  await expect(movieCards).toBeVisible();

  //check if the button for next page works
  await page.click('.movie-card');
  await expect(page).toHaveURL(/^http:\/\/localhost:3000\/movie\/\d+$/);
  
  
});
