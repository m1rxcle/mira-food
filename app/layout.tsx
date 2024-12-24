import { Analytics } from "@vercel/analytics/react"

import { Providers } from "@/shared/components/shared/providers"
import { Nunito } from "next/font/google"

import "./globals.css"

const nunito = Nunito({
	weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
	subsets: ["latin"],
	variable: "--font-nunito",
})

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={nunito.variable}>
				<Providers>
					{children}
					<Analytics />
				</Providers>
			</body>
		</html>
	)
}
