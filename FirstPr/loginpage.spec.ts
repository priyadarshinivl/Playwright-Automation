import{test, expect} from '@playwright/test';


test('has title', async({page}) => {

  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle(/Swag Labs/);

  

});

test('login button',async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);


    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();

    //const locator = page.locator('h3.header');
    await expect(page.locator('div > h3')).toContainText(['Epic sadface: Username is required']);

});

test('User name', async({page}) => {


    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.getByPlaceholder('Username').fill('priya');
    await page.getByPlaceholder('Password').fill('priya');
    
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();

    await expect(page.locator('div > h3')).toContainText(['Epic sadface: Username and password do not match any user in this service']);


});

test('New Test', async({page}) =>{

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    const loginButton = page.getByRole('button' ,{name: 'Login'});
    await loginButton.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");


});