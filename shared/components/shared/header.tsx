"use client"

import { cn } from "@/shared/lib/utils"
import React from "react"

import { Container } from "./container"
import { Button } from "../ui"

import Image from "next/image"
import { User } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./search-input"
import { CartButton } from "./cart-button"

interface Props {
	className?: string
}
export const Header: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Левая часть*/}

				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="Logo" width={35} height={35} />
						<div>
							<h1 className="text-2xl uppercase font-black">
								Mira.<span className="text-primary">Food</span>
							</h1>
							<p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				<div className="mx-10 flex-1 ">
					<SearchInput />
				</div>

				{/* Правая часть*/}
				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>

					<CartButton />
				</div>
			</Container>
		</div>
	)
}
