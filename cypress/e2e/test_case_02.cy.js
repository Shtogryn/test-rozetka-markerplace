import HomePage from '../support/page-objects/HomePage.js'
import NotebooksPage from '../support/page-objects/NotebooksPage.js'
import CartFormPage from '../support/page-objects/CartFormPage.js'
import locators from "../fixtures/locators-data.json";

describe('test_case_02', () => {
    const homePage = new HomePage();
    const notebooksPage = new NotebooksPage();
    const cartFormPage = new CartFormPage();

    let allTitles = new Array();
    let cartProductTitles = new Array();
    let totalPrice = 0;

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.log(" ---------- STARTUP ---------- ");
        cy.visit('/');
    });
    it('Summary: Add items to the basket”', () => {
        cy.log('Verify that the marketplace URl is correct');
        cy.url().should('be.eq', Cypress.config('baseUrl'));

        cy.log('Proceed to "Ноутбуки та комп’ютери" category')
        homePage.navigateToCategory('Ноутбуки та комп’ютери');

        cy.log('Proceed to "Ноутбуки" sub category');
        homePage.navigateToSubCategory('Ноутбуки');

        cy.log('Add first item in "Ноутбуки" category to cart');
        notebooksPage.getAllProducts().find('li').first().then(product => {

            cy.wrap(product).find(locators.goods_price).then((price) => {
                totalPrice = totalPrice + parseInt(price.text().replace(/\u00a0/g, "").replace('₴', ""));
            })
            cy.wrap(product).find(locators.goods_title).then((title) => {
                allTitles[1] = title.text().slice(1, -1);
            })
            cy.wrap(product).find(locators.button_buy).should('be.visible').click();
        });

        cy.log('Proceed to Home page category');
        cy.go('back');
        cy.go('back');

        cy.log('Proceed to "Смартфони, ТВ і електроніка" category');
        homePage.navigateToCategory('Смартфони, ТВ і електроніка');

        cy.log('Proceed to "Телевізори" subcategory');
        homePage.navigateToSubCategory('Телевізори');

        cy.log('Add first item in "Телевізори" category to cart');
        notebooksPage.getAllProducts().find('li').first().then(product => {

            cy.wrap(product).find(locators.goods_price).then((price) => {
                totalPrice = totalPrice + parseInt(price.text().replace(/\u00a0/g, "").replace('₴', ""));
            })
            cy.wrap(product).find(locators.goods_title).then((title) => {
                allTitles[0] = title.text().slice(1, -1);
            })
            cy.wrap(product).find(locators.button_buy).should('be.visible').click();
        });
        cartFormPage.getCartButton();
        cartFormPage.getCartProducts();

        cy.log('Verify information of items inside the basket');
        cartFormPage.getProductTitle().each(($el, index, $list) => {
            const productTitle = $el.text();
            cartProductTitles[index] = productTitle;
        }).then(() => {
            const stringifiedCardProductTitles = cartProductTitles.toString();
            allTitles = allTitles.toString();
            expect(stringifiedCardProductTitles).to.deep.eq(allTitles);
        });

        cy.log('.Verify that the price is calculated correctly.');
        cartFormPage.getCartTotalCost().then(cartTotalPrice => {
            cartTotalPrice = parseInt(cartTotalPrice.text().replace(/\u00a0/g, "").replace('₴', ""));
            expect(cartTotalPrice).to.deep.eq(totalPrice);
        });

        cy.log('Delete first item');
        cartFormPage.deleteFirstItem();

        cy.log('Verify that the delete item button is clickable.');
        cy.xpath(locators.goods_title_in_basket).should('have.length', 2);
    });
});