
describe('Login page', () => 
  
  {
    it ('shows the login page' , () => {

        cy.visit('http://localhost:5173/')

        cy.contains("Log in").should("be.visible")

    })

  }

)