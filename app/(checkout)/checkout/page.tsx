"use client"
import React from "react"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCart } from "@/shared/hooks"

import { CheckoutCart, CheckoutDeliveryAddress, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from "@/shared/components"
import { checkoutFormSchema, TCheckoutFormValues } from "@/shared/constans"
import { cn } from "@/shared/lib/utils"
import { createOrder } from "@/app/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Api } from "@/shared/services/api-client"

export default function CheckoutPage() {
	const { data: session } = useSession()
	const [submitting, setSubmitting] = React.useState(false)
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart()
	const router = useRouter()

	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	})

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data.fullName.split(" ")
			form.setValue("firstName", firstName)
			form.setValue("lastName", lastName)
			form.setValue("email", data.email)
		}

		if (typeof window !== "undefined" && session) {
			fetchUserInfo()
		}
	}, [form, session])

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	const onSubmit = async (data: TCheckoutFormValues) => {
		try {
			setSubmitting(true)
			const url = await createOrder(data)

			toast.error("Заказ успешно оформлен! 📝 Переход на оплату...", {
				icon: "✅",
			})

			if (url) {
				router.push(url)
			}
		} catch (error) {
			console.log(error)
			setSubmitting(false)
			toast.error("Не удалось создать заказ", {
				icon: "❌",
			})
		}
	}

	return (
		<Container className="mt-10 sm:mx-0">
			<Title text="Оформление заказа" className="font-extrabold mb-8 md:text-[36px] sm:text-[24px]" />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="md:flex md:flex-row sm:flex sm:flex-col md:gap-10 sm:gap-5">
						{/* Левая часть*/}

						<div className="flex flex-col gap-10 flex-1 mb-20">
							{/* Корзина*/}

							<CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} loading={loading || submitting} />

							{/* Персональные данные*/}

							<CheckoutPersonalForm className={cn({ "opacity-40 pointer-events-none": loading || submitting })} />

							{/* Адрес доставки */}

							<CheckoutDeliveryAddress className={cn({ "opacity-40 pointer-events-none": loading || submitting })} />
						</div>

						{/* Правая часть*/}

						<div className="md:w-[450px] sm:w-full">
							<CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
