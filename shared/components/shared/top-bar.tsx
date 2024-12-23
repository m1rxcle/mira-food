"use client"

import { cn } from "@/shared/lib/utils"
import React from "react"
import { Container } from "./container"
import { Categories } from "./categories"
import { SortPopup } from "./sort-popup"
import { Category } from "@prisma/client"
import { CartButton } from "./cart-button"

interface Props {
	hasCart?: boolean
	categories: Category[]
	className?: string
}
export const TopBar: React.FC<Props> = ({ categories, className }) => {
	const [scroll, setScroll] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY >= 200 ? true : false)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<div className={cn("sm:hidden md:block md:sticky top-0  bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
			<Container className="flex items-center justify-between ">
				<Categories items={categories} />
				<div className="flex items-center">
					<SortPopup />
					{scroll ? (
						<div className="sm:hidden md:block opacity-1 ml-4 translate-y-0 translate-x-0 transition-all duration-500 ease-in-out">
							<CartButton />
						</div>
					) : (
						<div className="opacity-0 translate-x-[100%] transition-all duration-500 ease-in-out "></div>
					)}
				</div>
			</Container>
		</div>
	)
}
