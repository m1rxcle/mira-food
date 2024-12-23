import { cn } from "@/shared/lib/utils"
import { CircleCheck } from "lucide-react"
import React from "react"

interface Props {
	imageUrl: string
	name: string
	price: number
	active?: boolean
	onClick?: () => void
	className?: string
}
export const IngredientItem: React.FC<Props> = ({ imageUrl, name, price, active, onClick }) => {
	return (
		<div
			className={cn("flex items-center flex-col p-1 rounded-md md:w-32 sm:w-[100px]  text-center relative cursor-pointer shadow-md bg-white", {
				"border border-primary": active,
			})}
			onClick={onClick}
		>
			{active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
			<img width={110} height={110} src={imageUrl} alt="ingredient" />
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	)
}
