export default class CartFormPage {

    getCartButton() {
        cy.xpath("//rz-cart/button").click();
    }

    getCartProducts() {
        cy.xpath("//rz-cart-product").should('be.visible').and('have.length', 2);
    }

    getProductTitle() {
        return cy.xpath("//a[@data-testid='title']");
    }

    getProductCost() {
        return cy.xpath("//p[@data-testid='cost']");
    }

    getCartTotalCost() {
        return cy.xpath("//div[@class='cart-receipt__sum-price']");
    }

    deleteFirstItem() {
        cy.xpath("//button[@id='cartProductActions0']").click();
        cy.xpath("//button[contains(text(),'Видалити')]").click();
        cy.wait(2000);
    }
}