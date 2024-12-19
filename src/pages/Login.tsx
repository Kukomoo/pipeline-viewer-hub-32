import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleAuthSuccess(session);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        handleAuthSuccess(session);
      }
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthSuccess = async (session: any) => {
    try {
      // Check if user has an organization
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('organization_id')
        .single();

      if (profileError) {
        throw profileError;
      }

      if (profile?.organization_id) {
        navigate("/");
      } else {
        console.error("User not associated with an organization");
        await supabase.auth.signOut();
        toast({
          title: "Error",
          description: "Your account is not associated with an organization. Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: "There was a problem signing you in. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/lovable-uploads/14960bfa-ea4b-4001-8a83-63355d968fad.png"
          alt="Yes.inc Logo"
          className="mx-auto h-24 w-auto mb-8"
        />
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Client Dashboard Login
        </h1>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#4f46e5',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;