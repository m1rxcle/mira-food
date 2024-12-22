"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formRegisterSchema, TFormRegisterValues } from "./schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Title } from "../../../title"
import { FormInput } from "../../../form"
import { Button } from "@/shared/components/ui"
import toast from "react-hot-toast"
import { registerUser } from "@/app/actions"

interface Props {
	onCLose?: VoidFunction
	onClickLogin?: VoidFunction
}
export const RegisterForm: React.FC<Props> = ({ onCLose }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.success("Регистрация успешно прошла 📝 , подтвердите почту", {
				icon: "✅",
			})

			onCLose?.()
		} catch (error) {
			console.error(error)
			toast.error("Неверный E-Mail или пароль", {
				icon: "❌",
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Регистрация аккаунта" size="md" className="font-bold" />
						<p className="text-gray-400">Введите свою почту и пароль, чтобы зарегистрироваться</p>
					</div>
					<img src="/assets/images/phone-login.png" alt="logo" width={60} height={60} />
				</div>

				<FormInput name="email" label="E-mail" required />
				<FormInput name="fullName" label="Введите имя" required />

				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

				<Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}
