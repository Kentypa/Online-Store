describe("Account creating spec", () => {
  it("should redirect after create account", () => {
    cy.intercept("POST", "http://localhost:3000/auth/sign-in", {
      statusCode: 200,
    }).as("signIn");

    cy.visit("sign-in");

    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[id="sign-in"]').click();

    cy.wait("@signIn");
  });

  it("should show incorrect input errors", () => {
    cy.intercept("POST", "http://localhost:3000/auth/sign-in", {
      statusCode: 400,
    }).as("signIn");

    cy.visit("sign-in");

    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[id="sign-in"]').click();

    cy.contains("Can`t sign in user. Try again.").should("be.visible");
    cy.wait("@signIn");
  });
});
