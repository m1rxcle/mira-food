"use client"
import React from "react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { Button } from "../ui"
import { ArrowRight, X } from "lucide-react"
import { CartDrawerItem } from "./cart-drawer-item"
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details"
import { PizzaSize, PizzaType } from "@/shared/constans/pizza"
import { Title } from "./title"
import { cn } from "@/shared/lib/utils"
import { useCart } from "@/shared/hooks"

interface Props {
	className?: string
}
export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()
	const [redirecting, setRedirecting] = React.useState(false)

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between sm:w-[200px] md:w-[400px]  pb-0    bg-[#f4f1EE]">
				<div className={cn("flex flex-col h-full ", !totalAmount && "justify-center")}>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle className={className}>
								В корзине{" "}
								<span className="font-bold">
									{items.length} {items.length === 1 ? "товар" : "товаров"}
								</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!totalAmount && (
						<>
							<SheetTitle hidden={true} />
							<SheetDescription hidden={true} />
							<div className="flex flex-col items-center justify-center md:w-72 sm:w-[170px]  mx-auto relative">
								<img className="mb-5 md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px]" src={"/assets/images/emptyCart.svg"} alt="empty" />
								<Title text="Пока тут пусто" className="text-center font-bold text-2xl mb-2" />
								<p className="text-center  text-neutral-800">Добавьте пиццу. Или две! А мы доставим ваш заказ от 599 ₽</p>

								<SheetClose asChild>
									<Button className="absolute top-1/2 -left-24  p-0 transition-all duration-500 ease-in-out hover:rotate-180" variant={"link"}>
										<X color="white" size={40} />
									</Button>
								</SheetClose>
							</div>
						</>
					)}

					{totalAmount > 0 && (
						<>
							<SheetDescription hidden={true} />
							<SheetTitle hidden={true} />
							<div className="-mx-6 mt-5 overflow-auto flex-1 ">
								{items.map((item) => (
									<div className="mb-2" key={item.id}>
										<CartDrawerItem
											id={item.id}
											imageUrl={item.imageUrl}
											details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
								<SheetClose asChild>
									<Button className="absolute top-[51.3%] -left-12  p-0 transition-all duration-500 ease-in-out hover:rotate-180" variant={"link"}>
										<X color="white" size={40} />
									</Button>
								</SheetClose>
							</div>

							<SheetFooter className="-mx-6 bg-white md:p-8 sm:p-2">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Итого
											<div className="flex border-b border-b-dashed border-b-neutral-200  relative w-full -top-1 mx-2" />
										</span>
										<span className="font-bold text-lg">{totalAmount} ₽</span>
									</div>
									<Link href="/checkout">
										<Button onClick={() => setRedirecting(true)} loading={redirecting} type="submit" className="w-full h-12 sm:text-sm md:text-base">
											Оформить заказ
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
