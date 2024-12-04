import { Nunito } from "next/font/google"
import { Toaster } from "react-hot-toast"

import "./globals.css"

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
})

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en,ru">
			<body className={nunito.variable}>
				{children} <Toaster />
			</body>
		</html>
	)
}
