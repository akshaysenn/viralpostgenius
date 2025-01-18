import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: "Magic link sent!",
        description: "Check your email for the login link",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4 relative overflow-hidden">
      {/* Animated gradient clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud-1 absolute bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full"></div>
        <div className="cloud cloud-2 absolute bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full"></div>
        <div className="cloud cloud-3 absolute bg-gradient-to-r from-purple-300/30 to-indigo-300/30 rounded-full"></div>
      </div>

      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Start Your Journey
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in securely with your email below
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4 fade-in">
            <div className="text-lg font-medium">Check your email</div>
            <p className="text-muted-foreground">
              We've sent a magic link to {email}
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-purple-50 transition-colors"
              onClick={() => setSent(false)}
            >
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 fade-in">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full transition-all duration-300 hover:border-purple-400 focus:border-purple-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? "Sending magic link..." : "Send magic link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;