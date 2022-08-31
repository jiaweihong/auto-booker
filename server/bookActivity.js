const {Builder, By, Capabilities, until, Key} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const CryptoJs = require('crypto-js');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();

//const req = require('./data.json');

async function logIntoBookingWebsite(driver, req){
    let usernameField = await driver.wait(until.elementLocated(By.css('input[id="username"]')), 30000);
    await usernameField.sendKeys(req.username);
    
    var bytes = CryptoJs.AES.decrypt(req.password, process.env.REACT_APP_ENCRYPTION_KEY);
    var password = bytes.toString(CryptoJs.enc.Utf8);

    let passwordField = await driver.wait(until.elementLocated(By.css('input[id="password"]')), 30000);
    await passwordField.sendKeys(password);

    let logIntoBookingWebsiteButton = await driver.wait(until.elementLocated(By.css('button[name="_eventId_proceed"]')), 30000);
    await logIntoBookingWebsiteButton.click();

    let isSuccessfulLogIn = await isLogInSuccessful(driver);
        
    if(isSuccessfulLogIn != true){
        throw new Error(await isSuccessfulLogIn.getText());
    }
}

async function selectSportsCentreCategoryActivity(driver, req){
    await selectsSportCentre(driver, req.sports_centre);

    // Select category
    let sportsHallRadio = await driver.wait(until.elementLocated(By.css('input[id="booking-behaviour-option2"]')), 30000);
    await sportsHallRadio.click();

    await selectActivity(driver, req.activity);

    let viewTimeTableButton = await driver.wait(until.elementLocated(By.css('button[data-test-id="bookings-viewtimetable"]')), 30000);
    await viewTimeTableButton.click();
}

async function selectsSportCentre(driver, sportsCentre) {
    let selectSportsCentreField = await driver.wait(until.elementLocated(By.css('input[class="select2-search__field"]')), 30000);
    await selectSportsCentreField.click();

    let sportsCentreUl = await driver.wait(until.elementLocated(By.css('ul[class="select2-results__options select2-results__options--nested"]')), 30000);
    let sportsCentreList = await sportsCentreUl.findElements(By.css('li'), 30000);

    if (sportsCentre == "David Ross") {
        await sportsCentreList[0].click();
    } else if (sportsCentre == "Jubilee Campus") {
        await sportsCentreList[1].click();
    } else {
        throw new Error("No valid sport centre was chosen");
    }
}

async function selectActivity(driver, activity){
    if (activity == "Volleyball - Hall C/D" ){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option279')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball 1/2 Court - Hall C/D"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option271')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball 1/2 Court - Hall A/B"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option270')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Cross Court - Hall C/D (Near)"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option362')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Full Court - Hall C/D"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option273')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Full Court - Hall A/B"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option272')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Cross Court - Hall C/D (Far)"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option361')), 30000);
        await option.click();
    } 


    else if (activity == "Volleyball - Hall 1"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option87')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball 1/2 Court - Hall 2"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option134')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball 1/2 Court - Hall 1"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option75')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Full Court - Hall 1"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option76')), 30000);
        await option.click();
    } 
    else if (activity == "Basketball Full Court - Hall 2"){
        let option = await driver.wait(until.elementLocated(By.id('booking-activity-option135')), 30000);
        await option.click();
    }
    
    else {
        throw new Error("No valid activity was chosen");
    }
}

async function buyNowActivity(driver, req){
    await selectDate(driver, req);

    let slot = await getSlot(driver, req)

    await addToBasket(driver, slot);
}

function getDateOfActivity(req) {
    const monthsOfTheyear = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    let month = monthsOfTheyear[req.activity_month - 1];

    activityDate = `${req.activity_day < 10 ? '0' + req.activity_day : req.activity_day} ${month} ${req.activity_year}`;

    return activityDate;
}

async function selectDate(driver, req){
    let dateField = await driver.wait(until.elementLocated(By.id("unique-identifier-2")), 30000);
    await dateField.clear();

    let activityDate = getDateOfActivity(req);

    await dateField.sendKeys(activityDate);
    await dateField.sendKeys(Key.ENTER);

    let dateText = await dateField.getAttribute("value");

    if (activityDate != dateText){
        throw new Error(`User's selected date is invalid. User Input: ${activityDate}, Date Field: ${dateText}`);
    }
}

async function getSlot(driver, req) {
    let listOfSlots = await driver.wait(until.elementsLocated(By.className("col-xs-12 col-sm-6 col-md-6 col-lg-4")), 30000);

    for (let slot of listOfSlots){
        let slotAnchor = await slot.findElement(By.css("A"));
        let timeDiv = slotAnchor.findElement(By.css(".timeOfDay"));
        let timeTextFromSlot = await timeDiv.getText();
        
        let spaceDetailsText = await slot.findElement(By.css(".spaceDetails")).getText();

        let count = 0;
        while (spaceDetailsText == ""){
            if (count == 0){
                spaceDetailsText = await slot.findElement(By.css(".spaceDetailsFull")).getText();
            } else if (count == 1) {
                spaceDetailsText = await slot.findElement(By.css(".spaceDetailsBasket")).getText();
            }
            count++;
        }

        let activityTime = `${req.activity_hour < 10 ? "0" + req.activity_hour : req.activity_hour}:00`;

        if (activityTime == timeTextFromSlot) {
            if (spaceDetailsText != "Full"){
                return slotAnchor;
            } else {
                throw new Error("The slot selected is full.")
            }
        }
    }

    // if the code execution gets to this point, then that means that the req.activityTime did not match any time slot.
    throw new Error("The time slot selected does not exist.")
}

async function addToBasket(driver, slot){
    await slot.click();

    let button = await driver.wait(until.elementLocated(By.css('button[data-test-id="bookings-sportshall-activitydetails-addandbookanother"]')), 30000);
    await driver.executeScript("arguments[0].click();", button);
}

async function payForBookings(driver){
    let basketSummaryContinueButton = await driver.wait(until.elementLocated(By.css('button[data-test-id="universalbasket-paymentsummary-continueoptions-continue"]')), 30000);
    await driver.executeScript("arguments[0].click();", basketSummaryContinueButton);

    let termAndConditionsButton = await driver.wait(until.elementLocated(By.css('input[data-test-id="shared-checkbox-i-accept-the-terms-&-conditions-input"]')), 30000)
    await driver.executeScript("arguments[0].click();", termAndConditionsButton);

    
    let basketSummaryContinueButton2 = await driver.wait(until.elementLocated(By.css('button[data-test-id="universalbasket-paymentsummary-continueoptions-continue"]')), 30000);
    while (basketSummaryContinueButton2.isEnabled() != true ){
        basketSummaryContinueButton2 = await driver.wait(until.elementLocated(By.css('button[data-test-id="universalbasket-paymentsummary-continueoptions-continue"]')), 30000);
        console.log("waiting");
    }
    console.log(1);
    await driver.executeScript("arguments[0].click();", basketSummaryContinueButton2);
}

async function isLogInSuccessful(driver){
    try {
        let errorElement = await driver.wait(until.elementLocated(By.css('p[class="form-element form-error"]')), 10000);
        return errorElement;
    } catch (error) {
        return true;
    }
}

async function bookActivity(req) {
    // 'eager' means that the get command will be considered complete when the DOM of the page is loaded
    const caps = new Capabilities();
    caps.setPageLoadStrategy("eager");

    const options = new chrome.Options();
    //options.addArguments('--headless');
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    let driver = await new Builder().withCapabilities(caps).forBrowser("chrome").setChromeOptions(options).build();
    
    try {
        // opens up page
        await driver.get("https://sso.legendonlineservices.co.uk/sso/nottingham/enterprise");
        
        await logIntoBookingWebsite(driver, req);
    
        let makeBookingButton = await driver.wait(until.elementsLocated(By.css('a[data-test-id="account-bookings-dropins"]')), 60000);
        await makeBookingButton[1].click();

        await selectSportsCentreCategoryActivity(driver, req);

        await buyNowActivity(driver, req);

        await driver.navigate().to("https://universityofnottingham.legendonlineservices.co.uk/enterprise/universalbasket/summary");

        await payForBookings(driver);

        //await driver.quit();

        const res = {
            booking_id: req.booking_id,
            message: "Success"
        }

        return Promise.resolve(res);
    } catch (error) {
        const res = {
            booking_id: req.booking_id,
            msg: error.message
        }

        return Promise.reject(res);
    }
}

module.exports = bookActivity;
