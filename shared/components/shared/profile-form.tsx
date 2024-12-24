"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas"
import toast from "react-hot-toast"
import { signOut } from "next-auth/react"
import { Container } from "./container"
import { Title } from "./title"
import { FormInput } from "./form"
import { Button } from "../ui"
import { updateUserInfo } from "@/app/actions"

interface Props {
	data: User
}
export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			confirmPassword: "",
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				fullName: data.fullName,
				email: data.email,
				password: data.password,
			})
			toast.success("Данные успешно обновлены 📝", {
				icon: "✅",
			})
		} catch (error) {
			console.error(error)
			return toast.error("Ошибка при обновлении данных", {
				icon: "❌",
			})
		}
	}

	const onClickSingOut = () => {
		signOut({
			callbackUrl: "/",
		})
	}

	return (
		<Container className="md:my-10 sm:my-0">
			<Title text={`Личные данные | ${data.fullName}`} size="md" className="font-bold" />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 md:w-96 sm:w-full mt-10">
					<FormInput name="email" label="E-mail" required />
					<FormInput name="fullName" label="Полное имя" required />

					<FormInput name="password" label="Пароль" type="password" />
					<FormInput name="confirmPassword" label="Подтвердите пароль" type="password" />

					<Button disabled={form.formState.isSubmitting} type="submit" className="text-base mt-10">
						Сохранить
					</Button>

					<Button onClick={onClickSingOut} variant="secondary" className="text-base " disabled={form.formState.isSubmitting} type="button">
						Выйти
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
