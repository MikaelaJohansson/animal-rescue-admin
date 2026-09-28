describe("Login page", () => {

  beforeEach(() => {

    cy.visit("http://localhost:5173/");

  });


  it("shows the login page", () => {

    cy.contains("Log in").should("be.visible");

  });


  it("shows an error message with incorrect login details", () => {

    cy.get('input[type="email"]')
      .type("wrong@animalrescue.se");

    cy.get('input[type="password"]')
      .type("wrongpassword");

    cy.contains("Log in").click();

    cy.contains("Incorrect email or password")
      .should("be.visible");

  });


  it("logs in with a demo account", () => {

    cy.contains("Demo accounts").click();

    cy.contains("Mikaela: Administrator").click();

    cy.get('input[type="email"]')
      .should("have.value", "demo@animalrescue.se");

    cy.get('input[type="password"]')
      .should("have.value", "demo4581235563768");

    cy.contains("Log in").click();

    cy.url().should("include", "/dashboard");

  });

});