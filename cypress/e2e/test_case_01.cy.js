import HomePage from '../support/page-objects/HomePage.js'
import NotebooksPage from '../support/page-objects/NotebooksPage.js'
import testData from "../fixtures/test-data.json";
import locators from "../fixtures/locators-data.json";

describe('test_case_01', () => {
    const homePage = new HomePage();
    const notebooksPage = new NotebooksPage();

    const minPrice = testData.minPrice.toString();
    const maxPrice = testData.maxPrice.toString();
    let prices = new Array();

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.log(" ---------- STARTUP ---------- ");
        cy.visit('/');
    });
    it('Summary: Verify if the price filter working correctly for the Rozetka marketplaces', () => {
        cy.log('Verify that the marketplace URl is correct');
        cy.url().should('be.eq', Cypress.config('baseUrl'));

        cy.log('Proceed to "Ноутбуки та комп’ютери" category')
        homePage.navigateToCategory('Ноутбуки та комп’ютери');

        cy.log('Proceed to "Ноутбуки" sub category');
        homePage.navigateToSubCategory('Ноутбуки');

        cy.log("Set up filter option");
        cy.log(`Set price range:(${minPrice} : ${maxPrice})`);
        notebooksPage.setPriceRange(minPrice, maxPrice);
        notebooksPage.sortByCheaper();
        notebooksPage.getAllProducts().find(locators.goods_price).each(($el, index, $list) => {

            prices[index] = $el.text().replace(/\u00a0/g, "").replace('₴', "");

        }).then(() => {

            const stringifiedSortedPrices = prices.sort().toString();
            const stringifiedPrices = prices.toString();
            const lowestPriceOfProduct = parseInt(prices[0]);
            const highestPriceOfProduct = parseInt(prices[prices.length - 1]);

            cy.log('Verify that all the items on the page are sorted correctly by the from and to price filters you entered.')
            expect(stringifiedPrices).to.deep.eq(stringifiedSortedPrices);
            expect(lowestPriceOfProduct >= minPrice).to.be.true;
            expect(highestPriceOfProduct <= maxPrice).to.be.true;
        });
    });
});