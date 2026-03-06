/// <reference lib="deno.window" />

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

// Validate required environment variables at startup
if (!supabaseUrl) {
  throw new Error("SUPABASE_URL environment variable is not set");
}

if (!serviceRole) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
}

if (!anonKey) {
  throw new Error("SUPABASE_ANON_KEY environment variable is not set");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRole,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export function createUserClient(req: Request) {
  const authHeader = req.headers.get("Authorization") ?? "";
  
  // Debug logging
  console.log("[createUserClient] RAW AUTH HEADER:", {
    headerExists: !!authHeader,
    headerLength: authHeader.length,
    headerStart: authHeader.substring(0, 30) + (authHeader.length > 30 ? "..." : ""),
    startsWithBearer: authHeader.startsWith("Bearer "),
    trimmedLength: authHeader.trim().length,
  });
  
  // Validate auth header format
  if (!authHeader) {
    console.error("[createUserClient] No Authorization header provided");
    throw new Error("No Authorization header provided");
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.error("[createUserClient] Invalid Authorization header format:", {
      received: authHeader.substring(0, 20),
      expected: "Bearer <token>",
    });
    throw new Error("Authorization header must start with 'Bearer '");
  }

  // Verify anonKey is available
  if (!anonKey) {
    console.error("[createUserClient] SUPABASE_ANON_KEY not configured");
    throw new Error("SUPABASE_ANON_KEY environment variable is not set");
  }

  console.log("[createUserClient] Creating Supabase client with auth header");

  return createClient(supabaseUrl!, anonKey, {
    global: {
      headers: {
        Authorization: authHeader.trim(),
      },
    },
  });
}
