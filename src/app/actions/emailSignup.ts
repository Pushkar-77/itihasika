"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type SignupResult = {
  success: boolean;
  message?: string;
  isDuplicate?: boolean;
};

export async function submitEmailSignup(email: string): Promise<SignupResult> {
  const trimmed = email.trim().toLowerCase();

  // Basic email validation
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("email_signups").insert({
      email: trimmed,
      source: "free-chart",
    });

    if (error) {
      // Postgres error 23505 = unique_violation (duplicate email)
      if (
        error.code === "23505" ||
        error.message?.toLowerCase().includes("duplicate") ||
        error.message?.toLowerCase().includes("unique")
      ) {
        return {
          success: true,
          isDuplicate: true,
          message:
            "Thank you! Your email is already registered, and we've verified your access to the timeline chart.",
        };
      }

      console.error("Supabase insert error:", error);
      return {
        success: false,
        message: "Failed to save your email. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Thank you! Your free printable timeline chart is ready, and we've sent details to your inbox.",
    };
  } catch (err: any) {
    console.error("submitEmailSignup error:", err);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
