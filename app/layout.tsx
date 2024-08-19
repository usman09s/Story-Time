import type { Metadata } from "next";
import { Inter ,Quicksand} from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { Toaster } from "sonner";
import ResponsiveWrapper from "./layouts/ResponsiveWrapper";

const inter = Inter({ subsets: ["latin"] });
const quicksand =  Quicksand({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Story Time ",
  description: "Admin Panel of Story Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>
) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthProvider>
          <body className={inter.className + quicksand.className}>
            <Toaster position="top-right" richColors />
            <ResponsiveWrapper>
            {children}
            </ResponsiveWrapper>
          </body>
        </AuthProvider>
      </ReactQueryProvider>
    </html>

  );
}
