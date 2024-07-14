import { ERROR } from "@/lib/messages";

describe("Sign-In Test", () => {
  it("Fills out the sign-in form and navigates to verify page", () => {
    // Visit the site
    cy.visit("/");

    // Click the sign-up link
    cy.get('a[href*="sign-in"]').click({ force: true });
    // Fill out the sign-up form
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("12345678");

    // Click the continue button
    cy.get('button[type="submit"]').contains("Sign In.").click({ force: true });

    // Check if the URL includes "/verify"
    cy.url().should("include", "/verify");

    // Check if localStorage contains the userToken
    cy.window().then((window) => {
      const userToken = window.localStorage.getItem("userToken");
      expect(userToken).to.not.be.null;
    });

    // Verify that the two specific links in the navbar have disappeared

    cy.get('a[href*="sign-up"]').should("not.exist");
    cy.get('a[href*="sign-in"]').should("not.exist");
  });

  it("Fills out the sign-in form  with wrong email and getting invalid credentials error", () => {
    // Visit the site
    cy.visit("/");

    // Click the sign-up link
    cy.get('a[href*="sign-in"]').click({ force: true });
    // Fill out the sign-up form
    cy.get('input[name="email"]').type("wrongemail@example.com");
    cy.get('input[name="password"]').type("12345678");

    // Click the continue button
    cy.get('button[type="submit"]').contains("Sign In.").click({ force: true });

    cy.get(".cy-alert")
      .should("be.visible")
      .contains(ERROR.LOGIN_FAILED_WRONG_CREDENTIALS);

    // Check if localStorage contains the userToken
    cy.window().then((window) => {
      const userToken = window.localStorage.getItem("userToken");
      expect(userToken).to.be.null;
    });

    // Verify that the two specific links in the navbar have disappeared

    cy.get('a[href*="sign-up"]').should("exist");
    cy.get('a[href*="sign-in"]').should("exist");
  });
});
