import{test, expect} from '@playwright/test';
import { TestContext } from 'node:test';


test('Main Page', async({page}) => {

    await page.goto("https://demoqa.com/");
    
    const imageLocator = page.locator('img[src="https://demoqa.com/images/Toolsqa.jpg/"]');
    const isVisible = await imageLocator.isVisible();

    //const seleimage =  page.locator('img[src="https://demoqa.com/images/WB.svg/"]');
    //const isViisible = await imageLocator.isVisible();
    //await seleimage.click();
    //await expect(page).toHaveURL("https://demoqa.com/interaction");

    await page.click('h5:has-text("Interactions")');
    await expect(page).toHaveURL("https://demoqa.com/interaction");

    const droping = page.locator('.text', { hasText: 'Droppable' });
    await droping.waitFor({ state: 'visible' }); 
    await droping.click();
    

    //await page.click('h5:has-text("Droppable")');

    //*[@id="draggable"]

    const buttonByText = page.locator('//button[text()="Submit"]');

    //const draghere = page.locator('/*[@id="draggable"]');
    //await draghere.click();

    const draggable = page.locator('#draggable'); // corrected the locator
    await draggable.waitFor({ state: 'visible' });
    await draggable.click();

    // Optional: Locate the droppable area and perform drag-and-drop
    const droppable = page.locator('#droppable');
    await page.dragAndDrop('#draggable', '#droppable');

    await page.click('//*[@id="app"]/div/div/div/div[1]/div/div/div[3]/span/div/div[1]');


    await page.click('li:has-text("Alerts")');

    //const logout = page.locator('//*[@id="alertButton"]');//click me
    //await logout.click();

    page.on('dialog', async(alert)=>
        {
            console.log(alert.message());
            await alert.accept();
        })
        await page.click('#alertButton');
    
  
});

