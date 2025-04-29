const { test, expect } = require('@playwright/test');

test('User can sign in successfully', async ({ page }) => {
    // Navigate to the sign-in page
    await page.goto('http://localhost:3000/signin');

    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click the submit button
    await page.click('button[type="submit"]');
    
    // Check for successful sign-in (redirect to home page)
    await expect(page).toHaveURL('http://localhost:3000/signin');
});