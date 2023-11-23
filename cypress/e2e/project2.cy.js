/// <reference types="cypress" />
import LoginPage from "../pages/LoginPage"

describe("project2", () => {

    beforeEach(() => {
        // cy.fixture("example.json").then(function(data) {
        //   this.username = data.username;
        //   this.password = data.password;
        // });
        cy.visit("/")
    });

    const loginPage = new LoginPage();
    const username = "TechGlobal";
    const password = "Test1234";

    it("validates the login form", () => {
        loginPage.getUsernameField().should("be.visible").and("not.have.attr", "required")
        loginPage.getUsernameField().prev().contains("Please enter your username")

        loginPage.getPasswordField().should("be.visible").and("not.have.attr", "required")
        loginPage.getPasswordField().prev().contains("Please enter your password")

        loginPage.getLoginButton().should("be.visible").and("not.have.attr", "disabled")
        loginPage.getLoginButton().contains("LOGIN")

        cy.get("a:contains('Forgot Password?')").should("be.visible").and("not.have.attr", "disabled")
        cy.get("a:contains('Forgot Password?')").should("have.text", "Forgot Password?")

    })
    
    it("validates the valid login", () => {
        loginPage.userLogin(username, password);
        loginPage.getSuccessMessage().should("be.visible");
        loginPage.getLogoutButton().should("be.visible").and("have.text", "LOGOUT");
    })

    it("validates the logout", () => {
        loginPage.userLogin(username, password);
        loginPage.clickLogoutButton()
        loginPage.getUsernameField().should("be.visible")
        loginPage.getPasswordField().should("be.visible")
    })

    it("validates the forgot password", () => {
        cy.get("a:contains('Forgot Password?')").click()
        cy.get("#sub_heading").should("be.visible")
        cy.get("button[class='delete']").should("be.visible")
        cy.get("#email").should("be.visible")
        cy.get("#email").prev().prev().contains("Enter your email address and we\'ll send you a link to reset your password.")
        cy.get("#submit").should("be.visible").and("not.have.attr", "disabled").contains("SUBMIT")
    })

    it("validates the rest password modal close btn", () => {
        cy.get("a:contains('Forgot Password?')").click()
        cy.get(".modal-card").should("be.visible")
        cy.get("button[class='delete']")
        cy.get(".modal-card").should("not.be.visible")
    })

    it("validates the reset password form submission", () => {
        cy.get("a:contains('Forgot Password?')").click()
        cy.get("#email").type("test@test.com")
        cy.get("#submit").click()
        cy.get("#confirmation_message").should("have.text", "A link to reset your password has been sent to your email address.")
    })

    it("validates the invalid login with the empty credentials", () => {
        loginPage.clickLoginButton()
        cy.get("#error_message").should("have.text", "Invalid Username entered!")
    })

    it("validates the invalid login with the wrong name", () => {
        loginPage.userLogin("John", "Test1234")
        cy.get("#error_message").should("have.text", "Invalid Username entered!")
    })

    it.only("validates the invalid login with the wrong pw", () => {
        loginPage.userLogin("John", "1234")
        cy.get("#error_message").should("have.text", "Invalid Username entered!")
    })
})