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



test('To loop through slide bars', async({page}) =>{

  
  const hamburger = page.locator('.bm-burger-button');
    await hamburger.click();
    const elements = page.$$('.menu-item');

    const expectedOptions = ['All Items', 'About', 'Logout', 'Reset App State'];

  for(const menu of await elements){
    //console.log(await menu.innerText()); //print options
    expect(expectedOptions).toContain(await menu.innerText());
  }

  const cross = page.locator('//*[@id="react-burger-cross-btn"]');

  await cross.click();
  await expect(hamburger).toBeVisible();


  

});

test('checking the About of the slidebars', async({page}) =>{

  const hamburger = page.locator('.bm-burger-button');
    await hamburger.click();
    

  const about = page.locator('//*[@id="about_sidebar_link"]');

  await about.click();
  await page.isVisible("search");



});


test('checking Logout in the slidebars', async({page}) =>{

  const hamburger = page.locator('.bm-burger-button');
    await hamburger.click();
    

  const logout = page.locator('//*[@id="logout_sidebar_link"]');

  await logout.click();
  await page.isVisible("login_logo");



});


test('checking resetappstate in the slidebars', async({page}) =>{

  const hamburger = page.locator('.bm-burger-button');
    await hamburger.click();
    

  const resetappstate = page.locator('//*[@id="reset_sidebar_link"]');

  await resetappstate.click();
  await page.isVisible("login_logo");



});





test('checking shoppingcart in the slidebars', async({page}) =>{

  const shoppingcart = page.locator('.shopping_cart_link');
    await shoppingcart.click();
    

    const checkout = page.locator("//button[@id='checkout']");



  await checkout.click();
  await page.isVisible("continue");

  //const cbutton = page.locator("//button[@id='continue']");

  const cbutton = page.locator("#continue");

  // Wait for the button to be visible and enabled before clicking
  await cbutton.waitFor({ state: 'visible', timeout: 30000 });
  //await cbutton.waitFor({ state: 'enabled', timeout: 30000 });


  await cbutton.click();
  

  await page.waitForSelector("//div[@id='checkout_info_container']//form//h3", { timeout: 10000 });

  // Assert the visibility of the element
  await expect(page.locator("//div[@id='checkout_info_container']//form//h3")).toBeVisible();

});