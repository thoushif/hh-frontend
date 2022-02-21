import { AuthProvider } from "@/context/AuthContext";
import { ToggleModeProvider } from "@/context/ModeContext";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToggleModeProvider>
        <Component {...pageProps} />
      </ToggleModeProvider>
    </AuthProvider>
  );
}

export default MyApp;
