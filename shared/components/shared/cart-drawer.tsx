import React from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { Button } from "../ui"
import { ArrowRight } from "lucide-react"
import { CartDrawerItem } from "./cart-drawer-item"
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details"
import { PizzaSize, PizzaType } from "@/shared/constans/pizza"
import { useCart } from "@/shared/hooks/use-cart"

interface Props {
	className?: string
}
export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1EE]">
				<SheetHeader>
					<SheetTitle className={className}>
						В корзине{" "}
						<span className="font-bold">
							{items.length} {items.length === 1 ? "товар" : "товаров"}
						</span>
					</SheetTitle>
				</SheetHeader>
				<SheetDescription hidden={true} />

				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<div className="mb-2" key={item.id}>
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								details={
									item.pizzaSize && item.pizzaType
										? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
										: ""
								}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>

				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex border-b border-b-dashed border-b-neutral-200  relative w-full -top-1 mx-2" />
							</span>
							<span className="font-bold text-lg">{totalAmount} ₽</span>
						</div>
						<Link href="/cart">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
