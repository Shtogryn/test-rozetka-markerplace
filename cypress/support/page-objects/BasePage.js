export default class BasePage {

    getAllProducts() {
        return cy.xpath('//ul[@class="catalog-grid ng-star-inserted"]');
    }
}