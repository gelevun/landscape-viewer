import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/");
        }
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        }
        if (event === "USER_UPDATED" || event === "PASSWORD_RECOVERY") {
          const { error } = await supabase.auth.getSession();
          if (error) {
            setErrorMessage(getErrorMessage(error));
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError): string => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          if (error.message.includes("Invalid login credentials")) {
            return "Geçersiz e-posta veya şifre. Lütfen bilgilerinizi kontrol edip tekrar deneyin.";
          }
          if (error.message.includes("Password should be at least 6 characters")) {
            return "Şifre en az 6 karakter uzunluğunda olmalıdır.";
          }
          if (error.message.includes("Email not confirmed")) {
            return "Lütfen e-posta adresinizi doğrulayın ve tekrar deneyin.";
          }
          break;
        case 422:
          if (error.message.includes("Email logins are disabled")) {
            return "E-posta ile giriş şu anda devre dışı. Lütfen sistem yöneticisi ile iletişime geçin.";
          }
          break;
      }
      
      switch (error.code) {
        case "invalid_credentials":
          return "Geçersiz e-posta veya şifre. Lütfen bilgilerinizi kontrol edip tekrar deneyin.";
        case "email_not_confirmed":
          return "Lütfen giriş yapmadan önce e-posta adresinizi doğrulayın.";
        case "user_not_found":
          return "Bu bilgilerle eşleşen kullanıcı bulunamadı.";
        case "invalid_grant":
          return "Geçersiz giriş bilgileri.";
        case "email_provider_disabled":
          return "E-posta ile giriş şu anda devre dışı. Lütfen sistem yöneticisi ile iletişime geçin.";
        default:
          return error.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
      }
    }
    return error.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          ArsaPort'a Hoş Geldiniz
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hesabınıza giriş yapın veya yeni hesap oluşturun
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000',
                    brandAccent: '#666',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "E-posta",
                  password_label: "Şifre",
                  button_label: "Giriş Yap",
                  loading_button_label: "Giriş yapılıyor...",
                  social_provider_text: "{{provider}} ile giriş yap",
                  link_text: "Zaten hesabınız var mı? Giriş yapın",
                },
                sign_up: {
                  email_label: "E-posta",
                  password_label: "Şifre",
                  button_label: "Kayıt Ol",
                  loading_button_label: "Kayıt olunuyor...",
                  social_provider_text: "{{provider}} ile kayıt ol",
                  link_text: "Hesabınız yok mu? Kayıt olun",
                  confirmation_text: "E-posta adresinize doğrulama bağlantısı gönderildi",
                },
                forgotten_password: {
                  link_text: "Şifrenizi mi unuttunuz?",
                  button_label: "Şifremi Sıfırla",
                  loading_button_label: "Şifre sıfırlama bağlantısı gönderiliyor...",
                  confirmation_text: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi",
                },
              },
            }}
            providers={[]}
            view="sign_up"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;