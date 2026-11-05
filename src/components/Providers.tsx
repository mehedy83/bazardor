
"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "var(--font-hind), sans-serif",
            borderRadius: "12px",
            fontSize: "15px",
          },
        }}
      />
    </>
  );
}
