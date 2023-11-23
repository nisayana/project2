class LoginPage {

    getUsernameField(){
        return cy.get('#username')
    }

    getPasswordField(){
        return cy.get('#password')
    }

    getLoginButton(){
        return cy.get('#login_btn')
    }

    clickLoginButton(){
        this.getLoginButton().click()
    }

    getSuccessMessage(){
        return cy.get('#success_lgn')
    }

    getLogoutButton(){
        return cy.get("#logout")
    }

    clickLogoutButton(){
        this.getLogoutButton().click()
    }

    userLogin(username, password){
        this.getUsernameField().type(username)
        this.getPasswordField().type(password)
        this.clickLoginButton()
     }
}

export default LoginPage;