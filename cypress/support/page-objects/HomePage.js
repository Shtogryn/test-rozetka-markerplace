import BasePage from "./BasePage";

export default class HomePage extends BasePage {

    navigateToCategory(category) {
        cy.xpath("//a[@class='menu-categories__link']").contains(category).click();
        cy.wait(2500);
    }
    navigateToSubCategory(sub_category) {
        cy.get('.tile-cats__heading.tile-cats__heading_type_center.ng-star-inserted').contains(sub_category).click();
        cy.wait(2500);
    }
    searchByProductName(productName) {
        cy.xpath('//input[@name="search"]').type(productName);
        cy.xpath("//button[contains(text(),'Знайти')]").click();
    }
}