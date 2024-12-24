import React from "react"
import { WhiteBlock } from "./white-block"
import { CheckoutItemDetails } from "./checkout-item-details"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { Button, Skeleton } from "../ui"
import { cn } from "@/shared/lib/utils"

interface Props {
	loading?: boolean
	totalAmount: number
	className?: string
}
export const CheckoutSidebar: React.FC<Props> = ({ loading, totalAmount, className }) => {
	const deliveryPrice = 599
	const paymentPrice = Math.floor(totalAmount * 0.15)
	const totalPrice = totalAmount + deliveryPrice + paymentPrice
	return (
		<WhiteBlock className={cn("p-6 sticky top-4 ", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				<span className="text-[34px] font-extrabold">{loading ? <Skeleton className="h-[51px] w-[150px]" /> : totalPrice + " ₽"}</span>
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={20} className="mr-2 text-gray-300" />
						Стоимость товаров:
					</div>
				}
				value={loading ? <Skeleton className="h-[20px] w-[80px] rounded-[8px]" /> : `${totalAmount} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={20} className="mr-2 text-gray-300" />
						Налоги:
					</div>
				}
				value={loading ? <Skeleton className="h-[20px] w-[60px] rounded-[8px] " /> : `${paymentPrice} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={20} className="mr-2 text-gray-300" />
						Доставка:
					</div>
				}
				value={loading ? <Skeleton className="h-[20px] w-[60px] rounded-[8px] " /> : `${deliveryPrice} ₽`}
			/>
			<Button loading={loading} type="submit" className="w-full mt-6 rounded-2xl h-14 text-base font-bold">
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	)
}
