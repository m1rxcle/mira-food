"use client"

import React from "react"
import { cn } from "@/shared/lib/utils"
import { X } from "lucide-react"
import { CartItemProps } from "./cart-item-details/cart-item-details.types"
import * as CartItemDetails from "./cart-item-details"

interface Props extends CartItemProps {
	onClickRemove?: () => void
	onClickCountButton?: (type: "plus" | "minus") => void
	className?: string
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div
			className={cn(
				"md:flex-row items-center md:justify-between sm:flex sm:flex-col  ",
				{
					"opacity-50 pointer-events-none": disabled,
				},
				className
			)}
		>
			<div className="md:flex-row md:flex-1  md:items-center md:gap-5 sm:flex sm:flex-col sm:items-center sm:mb-2 md:mb-0">
				<CartItemDetails.Image className="w-[100px] h-[100px]" src={imageUrl} />
				<CartItemDetails.Info name={name} details={details} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className="flex md:items-center sm:justify-end gap-5 md:ml-20 sm:mt-2 md:mt-0">
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
				<button type="button" onClick={onClickRemove}>
					<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
				</button>
			</div>
		</div>
	)
}
