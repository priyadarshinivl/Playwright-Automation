import{test, expect} from '@playwright/test';
import { TestContext } from 'node:test';

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

test('Adding things to the cart', async({page}) =>{

 const tocart = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");

 await page.waitForSelector("//button[@id='add-to-cart-sauce-labs-backpack']", { state: 'visible' });
 //await page.waitForSelector("//button[@id='add-to-cart-sauce-labs-backpack']", { state: 'enabled' });
 await tocart.click();

 const shoppingcart = page.locator('.shopping_cart_link');
    await shoppingcart.click();

    await expect(page.locator(".inventory_item_name")).toBeVisible();
    const checkout = page.locator("//button[@id='checkout']");

    await checkout.click();

    const firstname = await page.locator("input[name='firstName']");
    await firstname.fill('Priyadarshini');

    const lastname = await page.locator('input[data-test=lastName]');
    await lastname.fill('Lakshaman');

    const postalcode = await page.waitForSelector("#postal-code");
    
    await postalcode.fill('600047');
    


    //await page.getByPlaceholder('First Name').fill('Priyadarshini');
    //await page.getByPlaceholder('Last Name').fill('Lakshmanan');
    //await page.getByPlaceholder('Zip/Postal Code').fill('600047');

    const cbutton = page.locator("#continue");
  await cbutton.click();
  await page.locator('input[data-test=lastName]').isVisible();

  await page.locator("//button[@id='finish']").click();




});



test('Dropdown options', async({page}) =>{

  const productsort = page.locator(".product_sort_container");
  await productsort.click();



 /* <select productsort>

  <option value='az'>Name(A to Z)</option>
  <option value='za'>Name(Z to A)</option>
  <option value='lohi'>PRICE(low to high)</option>
  <option value='lohi'>PRICE(high to low)</option>

  </select>

  */

  const dropdown = page.locator('.product_sort_container');

  //await dropdown.selectOption('az'); // Select "Name(A to Z)"
  
  await dropdown.selectOption('za'); // Select "Name(Z to A)"
  
  //await dropdown.selectOption('lohi'); // Select "PRICE(low to high)"
  
  //await dropdown.selectOption('hilo');

 // await page.waitForSelector(".inventory_item_name",{ state: 'visible' });

 //await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Expected Text');

 await expect(page.locator('//*[@id="item_3_title_link"]/div')).toHaveText(/Test\.allTheThings\(\) T-Shirt \(Red\)/);
});