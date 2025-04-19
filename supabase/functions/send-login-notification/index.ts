// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      // Get these from environment variables
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: { headers: { Authorization: req.headers.get("Authorization")! } },
      }
    );

    const { username } = await req.json();

    // In a real implementation, this would send an email using a service like SendGrid, etc.
    // For this educational project, we'll just log the attempt
    console.log(`Login attempt received for user: ${username}`);

    // Store the notification in a separate table if desired
    const { error } = await supabaseClient
      .from("login_notifications")
      .insert({ 
        username,
        notification_sent: true, 
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notification sent for login attempt by ${username}` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

// To invoke:
// curl -i --location --request POST 'https://your-project-ref.functions.supabase.co/send-login-notification' \
//   --header 'Content-Type: application/json' \
//   --data '{"username":"test@example.com"}'