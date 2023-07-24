import LoginForm from '../support/page-objects/LoginForm.js'
import testData from "../fixtures/test-data.json";
import locators from "../fixtures/locators-data.json";

describe("test_case_04", () => {
    const loginForm = new LoginForm();

    const login = testData.invalidPhoneNum;
    const password = testData.invalidPassword;
    const expectedMessage = testData.errMessage;

    before(() => {
        cy.visit('');
    });

    it("Failed login: After not accepted capture varification", () => {

        cy.log('Proced to "Login Form"');
        loginForm.clickOnMyProfileIcn();
        loginForm.getLoginForm();

        cy.log('Input login');
        loginForm.inputLogin(login);

        cy.log('Input passoword');
        loginForm.getPasswordInput(password);

        cy.log('Press on Logic button');
        loginForm.clickOnLoginBth();

        cy.log(`Verify that error text ${expectedMessage} is displayed`);
        cy.get(locators.error_message).should('contain', expectedMessage);
    });
});