import { ERROR } from "@/lib/messages";

describe("Sign-Up Test", () => {
  it("Fills out the sign-up form and navigates to verify page", async () => {
    // making sure the user doesnot exsit
    // Visit the site
    cy.visit("/");

    // Click the sign-up link
    cy.get('a[href*="sign-up"]').click({ force: true });
    // Fill out the sign-up form
    cy.get('input[name="fullname"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("12345678");

    // Click the continue button
    cy.get('button[type="submit"]')
      .contains("Create an account.")
      .click({ force: true });

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

  it("Fills out the sign-up form with an exsiting email and getting email already exsits error", () => {
    // Visit the site
    cy.visit("/");

    // Click the sign-up link
    cy.get('a[href*="sign-up"]').click({ force: true });
    // Fill out the sign-up form
    cy.get('input[name="fullname"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("12345678");

    // Click the continue button
    cy.get('button[type="submit"]')
      .contains("Create an account.")
      .click({ force: true });

    // Check if the URL includes "/verify"
    cy.get(".cy-alert")
      .should("be.visible")
      .contains(ERROR.REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS);

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
