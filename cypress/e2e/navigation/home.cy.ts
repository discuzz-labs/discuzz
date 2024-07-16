describe("Navigation", () => {
  it("Navigate to /sign-up", () => {
    cy.visit("/");

    cy.get('a[href*="/sign-up"]').should("be.visible").click({ force: true });

    cy.url().should("include", "/sign-up");
  });

  it("Navigate to /sign-in", () => {
    cy.visit("/");

    cy.get('a[href*="/sign-in"]').should("be.visible").click({ force: true });

    cy.url().should("include", "/sign-in");
  });
});
