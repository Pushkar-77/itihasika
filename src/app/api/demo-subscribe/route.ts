import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    // 1. Verify user session with Supabase server client
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to subscribe." },
        { status: 401 }
      );
    }

    // 2. Parse payload
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty or invalid body fallback
    }

    const rawPlan = body?.plan;
    const plan = rawPlan === "annual" ? "annual" : "monthly";

    // 3. Update profiles row using SUPABASE_SERVICE_ROLE_KEY (server only)
    const admin = createAdminClient();
    const { error: updateError } = await admin.from("profiles").upsert(
      {
        id: user.id,
        plan,
      },
      { onConflict: "id" }
    );

    if (updateError) {
      console.error("demo-subscribe database error:", updateError);
      return NextResponse.json(
        { error: "Failed to update profile subscription plan." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      plan,
      userId: user.id,
    });
  } catch (err: any) {
    console.error("demo-subscribe unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing subscription." },
      { status: 500 }
    );
  }
}
