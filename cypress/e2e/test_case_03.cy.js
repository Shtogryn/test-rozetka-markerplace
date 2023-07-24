import HomePage from '../support/page-objects/HomePage.js'
import testData from "../fixtures/test-data.json";
import locators from "../fixtures/locators-data.json";

describe("test_case_03", () => {
    const homePage = new HomePage();
    const productName = testData.expectSearchItem;

    before(() => {
        cy.visit('');
    });

    it("Summary: “Search the item”", () => {
        cy.log('Verify that the marketplace URl is correct');
        cy.url().should('be.eq', Cypress.config('baseUrl'));

        cy.log(`Search item by ${productName} product name`);
        homePage.searchByProductName(productName);

        cy.log('Verify that all items are correctly displayed' +
            +'according to your searching request (only on the first page).')
        homePage.getAllProducts().find(locators.goods_tile_heading).each(($el, index, $list) => {

            let productTitle = $el.text();
            productTitle = productTitle.slice(0, productName.length + 1);
            expect(productTitle).contains(productName);

        })
    });

});