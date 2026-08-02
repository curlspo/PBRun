import { Platform } from "react-native";

/**
 * Production web access is enforced by Vercel middleware (HttpOnly cookie
 * set on successful /api/redeem). This component is a no-op shell so native
 * builds are unchanged; do not client-redirect on web or we fight the cookie.
 */
export function AccessGate({ children }: { children: React.ReactNode }) {
  if (Platform.OS === "web") {
    return <>{children}</>;
  }
  return <>{children}</>;
}
