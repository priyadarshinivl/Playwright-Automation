import{test, expect} from '@playwright/test';
import { TestContext } from 'node:test';


test.beforeEach('Main Page', async({page}) => {

    await page.goto("https://demoqa.com/");
    
    const imageLocator = page.locator('img[src="https://demoqa.com/images/Toolsqa.jpg/"]');
    const isVisible = await imageLocator.isVisible();

    await page.click('h5:has-text("Interactions")');
    await expect(page).toHaveURL("https://demoqa.com/interaction");

});

test('Drag and drop, pop ups',async({page}) => {

    const droping = page.locator('.text', { hasText: 'Droppable' });
    await droping.waitFor({ state: 'visible' }); 
    await droping.click();


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
    
  //clicking on Model Dialogue:
  const modeldialogue= page.locator('.text', { hasText: 'Modal Dialogs' });
  await modeldialogue.waitFor({ state: 'visible' }); 
  await modeldialogue.click();

  const smalldialogue = page.locator('#showSmallModal');
  await smalldialogue.click();

  const popups = page.locator('#closeSmallModal');
  await popups.click();

});

/*
test('Learning Nested frames', async({page}) => {
 
    await page.click('//*[@id="app"]/div/div/div/div[1]/div/div/div[3]/span/div/div[1]');

  const nestedframes = page.locator('.text', { hasText: 'Nested Frames' });
  await nestedframes.waitFor({ state: 'visible', timeout: 30000 });
  await nestedframes.click();

  const mainFrame = page.mainFrame();

  // Get all child frames (nested frames) within the main frame
  const childFrames = mainFrame.childFrames();

  // Print the number of child frames
  console.log('Number of child frames:', childFrames.length);


  //const iframe1 = page.locator("//iframe[@jsname='Child Iframe']");
  //console.log('Name of child frames:', iframe1.innerText);


});

*/





test('New tab and window', async({page}) => {

    await page.goto("https://demoqa.com/");

    //const imageLocator = page.locator('img[src="/images/WB.svg"]');
   // const isVisible = await imageLocator.isVisible();
    //await imageLocator.click();

    const xpath = '//*[@id="app"]/div/div/div[1]/a/img';
    await page.waitForSelector(xpath);
    await page.click(xpath);

    await page.waitForSelector('text=Navigate after timeout');
    await page.click('text=Navigate after timeout');
    
    
    console.log('Navigated to:', page.url());





});