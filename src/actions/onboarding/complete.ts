"use server";

import createUser from "@/Database/create/user";
import { ReturnType } from "@/types/actions";
import { User } from "@/types/database";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (
  formData: FormData,
  userData: User
): Promise<ReturnType<undefined>> => {
  const { userId } = auth();

  if (!userId) {
    return { message: "Please log in first.", success: false };
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        applicationName: formData.get("applicationName"),
        applicationType: formData.get("applicationType"),
      },
    });
    await createUser(userData);
    return { message: "Account created successfully.", success: true };
  } catch (err) {
    return {
      message: "There was an error creating your account.",
      success: false,
      error: err,
    };
  }
};
