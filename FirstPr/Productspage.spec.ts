import{test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    const loginButton = page.getByRole('button' ,{name: 'Login'});
    await loginButton.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
test('Verify hamburger menu', async({page}) =>{
   
    const hamburger = page.locator('.bm-burger-button');
    await hamburger.click();
    const elements = page.$$('.menu-item');
         
         //await expect(elements).toHaveCount(4);

         

    for (const menuitem of await elements) {
    console.log(await menuitem.innerText());
  }

});




