export default class LoginForm {

    clickOnMyProfileIcn() {
        cy.xpath("//li[@class='header-actions__item header-actions__item--user']").click();
    }

    getLoginForm() {
        cy.xpath("//div[@class='modal__content']/..").should('be.visible');
    }

    inputLogin(login) {
        cy.xpath("//input[@type='email']").type(login).should('have.value', login);
    }

    getPasswordInput(password) {
        cy.xpath("//input[@type='password']").type(password).should('have.value', password);
    }

    clickOnLoginBth() {
        cy.xpath("//button[contains(text(),'Увійти')]").click();
    }
}