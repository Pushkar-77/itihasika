"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleWatchlist(titleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, inWatchlist: false, error: "Not logged in" };
    }

    // Check if exists
    const { data: existing } = await supabase
      .from("watchlist")
      .select("title_id")
      .eq("user_id", user.id)
      .eq("title_id", titleId)
      .maybeSingle();

    if (existing) {
      const { error: delError } = await supabase
        .from("watchlist")
        .delete()
        .eq("user_id", user.id)
        .eq("title_id", titleId);

      if (delError) {
        console.error("Watchlist delete error:", delError);
        return { success: false, inWatchlist: true, error: delError.message };
      }

      revalidatePath(`/films`, "layout");
      return { success: true, inWatchlist: false };
    } else {
      const { error: insError } = await supabase
        .from("watchlist")
        .insert({ user_id: user.id, title_id: titleId });

      if (insError) {
        console.error("Watchlist insert error:", insError);
        return { success: false, inWatchlist: false, error: insError.message };
      }

      revalidatePath(`/films`, "layout");
      return { success: true, inWatchlist: true };
    }
  } catch (err: any) {
    console.error("toggleWatchlist exception:", err);
    return { success: false, inWatchlist: false, error: err?.message || "Failed" };
  }
}
