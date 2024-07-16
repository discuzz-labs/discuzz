import { UserSessionInterface } from "@/components/providers/AuthProvider";
import { signToken } from "@/services/jwt";

describe("Sign-In Navigation Test", () => {
  const userUnverifiedSession: UserSessionInterface = {
    email: "test@example.com",
    fullName: "Test User",
    imageURL: "profile-image",
    verified: false,
  };
  const userVerifiedSession: UserSessionInterface = {
    email: "test@example.com",
    fullName: "Test User",
    imageURL: "profile-image",
    verified: true,
  };

  it("should navigate to /verify if the /sign-in page was visited and userToken has verified set to false", () => {
    // Set the userToken in localStorage with verified: false
    cy.window().then((window) => {
      window.localStorage.setItem(
        "userToken",
        signToken(userUnverifiedSession)
      );
    });

    // Visit the /sign-in page
    cy.visit("/sign-in");

    // Check if the URL includes "/verify"
    cy.url().should("include", "/verify");
  });

  it("should navigate to /dashboard if the /sign-in page was visited and userToken has verified set to true", () => {
    // Set the userToken in localStorage with verified: false
    cy.window().then((window) => {
      window.localStorage.setItem("userToken", signToken(userVerifiedSession));
    });

    // Visit the /sign-in page
    cy.visit("/sign-in");

    // Check if the URL includes "/dashboard"
    cy.url().should("include", "/dashboard");
  });
});
