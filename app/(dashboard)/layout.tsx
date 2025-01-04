import { Metadata } from "next"

export const metadata: Metadata = {
	title: "MIRA FOOD | Корзина",
	description: "Generated by human hands :p",
	icons: "/logo.png",
}

export default function DashboardPage({ children }: { children: React.ReactNode }) {
	return <main className="min-h-screen bg-[#F4F1EE]">{children}</main>
}
