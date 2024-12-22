"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/shared/lib/utils"
import toast from "react-hot-toast"

import { Container } from "./container"
import { ProfileButton } from "./profile-button"
import { SearchInput } from "./search-input"
import { CartButton } from "./cart-button"

import Image from "next/image"
import Link from "next/link"
import { AuthModal } from "./modals"

interface Props {
	hasCart?: boolean
	hasSearch?: boolean
	className?: string
}
export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const searchParams = useSearchParams()
	const router = useRouter()

	React.useEffect(() => {
		let toastMessage = ""

		if (searchParams.has("paid")) {
			toastMessage = "Заказ успешно оплачен! 🎉 \n Информация будет отправлена на почту."
		}

		if (searchParams.has("verified")) {
			toastMessage = "Почта успешно подтверждена!"
		}
		if (toastMessage) {
			setTimeout(() => {
				router.push("/", { scroll: false })
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])

	return (
		<div className={cn("border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Левая часть*/}

				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="Logo" width={35} height={35} />
						<div>
							<h1 className="text-2xl uppercase font-black">
								Mira.<span className="text-primary">Food</span>
							</h1>
							<p className="text-sm text-gray-400 leading-3">вкусней уже некуда !</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1 ">
						<SearchInput />
					</div>
				)}

				{/* Правая часть*/}
				<div className="flex items-center gap-3">
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
					<ProfileButton onClickSingIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</div>
	)
}
