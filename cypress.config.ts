import { defineConfig } from "cypress";
import prisma from "./src/lib/prisma";

export default defineConfig({
  projectId: "43aacv",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("before:spec", (details) => {
        if (details.name == "01-signup.cy.ts") {
          prisma.user.delete({
            where: {
              email: "test@example.com",
            },
          });
        }
      });
    },
    experimentalRunAllSpecs: true,
  },
  experimentalInteractiveRunEvents: true,
});
