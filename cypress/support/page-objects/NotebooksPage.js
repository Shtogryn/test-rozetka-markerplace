import BasePage from "./BasePage";
export default class NotebooksPage extends BasePage {

    setPriceRange(minPrice, maxPrice) {
        cy.xpath("//input[@formcontrolname='min']").clear().type(minPrice.toString()).should('have.value', minPrice);
        cy.xpath("//input[@formcontrolname='max']").clear().type(maxPrice.toString()).should('have.value', maxPrice);
        cy.xpath("//button[@type='submit']").click();
        cy.wait(2500);
    }
    sortByCheaper() {
        cy.xpath("//rz-sort/select").select('1: cheap');
    }
}