import React from "react"
import { WhiteBlock } from "../white-block"
import { FormInput } from "../form"

interface Props {
	className?: string
}
export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="md:grid md:grid-cols-2 md:gap-5 sm:flex sm:flex-col sm:gap-4">
				<FormInput name="firstName" className="text-base" placeholder="Имя" />
				<FormInput name="lastName" className="text-base" placeholder="Фамилия" />
				<FormInput name="email" className="text-base" placeholder="E-mail" />
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	)
}
