import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.provider";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Layout />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
