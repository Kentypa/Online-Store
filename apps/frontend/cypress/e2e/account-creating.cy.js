describe("Account creating spec", () => {
  it("should redirect after create account", () => {
    cy.intercept("POST", "http://localhost:3000/auth/sign-up", {
      statusCode: 200,
    }).as("signUp");

    cy.visit("sign-up");

    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[id="sign-up"]').click();

    cy.wait("@signUp");
  });

  it("should show incorrect input errors", () => {
    cy.intercept("POST", "http://localhost:3000/auth/sign-up", {
      statusCode: 400,
    }).as("signUp");

    cy.visit("sign-up");

    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[id="sign-up"]').click();

    cy.contains("Can`t sign up user. Try again.").should("be.visible");
    cy.wait("@signUp");
  });
});
