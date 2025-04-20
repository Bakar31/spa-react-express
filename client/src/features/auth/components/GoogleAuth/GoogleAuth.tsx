import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext/AuthContext.provider";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GoogleAuth = () => {
  const { googleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  // Load Google Sign-In SDK if not already loaded
  useEffect(() => {
    if (window.google) {
      setIsGoogleScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGoogleScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isGoogleScriptLoaded || !window.google) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("Google Client ID is not defined");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCallback,
    });

    const googleButtonContainer = document.getElementById(
      "google-signin-button"
    );
    if (googleButtonContainer) {
      window.google.accounts.id.renderButton(googleButtonContainer, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: "100%",
        text: "signin_with",
      });
    }
  }, [isGoogleScriptLoaded]);

  const handleGoogleCallback = async (response: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const { credential } = response;
      await googleSignIn(credential);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
      console.error("Google auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setError("Google Sign-In is not available. Please try again later.");
    }
  };

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 text-sm mb-2">{error}</p>
        <Button variant="outline" onClick={() => setError(null)}>
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Button disabled variant="outline" className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Signing in with Google...
      </Button>
    );
  }

  return (
    <>
      <div id="google-signin-button" className="w-full"></div>
      {!isGoogleScriptLoaded && (
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={handleManualGoogleSignIn}
        >
          Sign in with Google
        </Button>
      )}
    </>
  );
};

export default GoogleAuth;
