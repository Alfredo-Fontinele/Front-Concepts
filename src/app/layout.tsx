"use client"

import { MantineProvider } from "@mantine/core"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
            globalStyles: (theme) => ({
              "*, *::before, *::after": {
                boxSizing: "border-box",
              },
            }),
            breakpoints: {
              xs: "30em",
              sm: "48em",
              md: "64em",
              lg: "74em",
              xl: "94rem",
            },
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
