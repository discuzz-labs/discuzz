import { UserSessionInterface } from "@/components/providers/AuthProvider";
import { signToken } from "@/services/jwt";

describe("Verify Navigation Test", () => {
  const userVerifiedSession: UserSessionInterface = {
    email: "test@example.com",
    fullName: "Test User",
    imageURL: "profile-image",
    verified: true,
  };

  it("should navigate to /dashboard if the /verify page was visited and userToken has verified set to true", () => {
    // Set the userToken in localStorage with verified: false
    cy.window().then((window) => {
      window.localStorage.setItem("userToken", signToken(userVerifiedSession));
    });

    // Visit the /sign-in page
    cy.visit("/verify");

    // Check if the URL includes "/dashboard"
    cy.url().should("include", "/dashboard");
  });
});
