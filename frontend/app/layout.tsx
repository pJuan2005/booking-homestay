// ============================================================
// TARGET: frontend/app/layout.tsx
// Root layout — wraps every page in the app
// ============================================================

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/context/AuthContext";

export const metadata: Metadata = {
  title: "HomeStay — Find Your Perfect Stay",
  description:
    "Discover unique homestays, cozy cabins, and luxury villas across 80+ countries. Book with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap 5 CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Bootstrap 5 JS Bundle (needed for dropdowns, modals, etc.) */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </html>
  );
}
