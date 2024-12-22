"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formLoginSchema, TFormLoginValues } from "./schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Title } from "../../../title"
import { FormInput } from "../../../form"
import { Button } from "@/shared/components/ui"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

interface Props {
	onCLose?: VoidFunction
}
export const LoginForm: React.FC<Props> = ({ onCLose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn("credentials", {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success("Вы успешно вошли в аккаунт", {
				icon: "✅",
			})

			onCLose?.()
		} catch (error) {
			console.error(error)
			toast.error("Неправильный логин или пароль", {
				icon: "❌",
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
					</div>
					<img src="/assets/images/phone-login.png" alt="logo" width={60} height={60} />
				</div>

				<FormInput name="email" label="E-mail" required />

				<FormInput name="password" label="Пароль" type="password" required />

				<Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
					Войти
				</Button>
			</form>
		</FormProvider>
	)
}
