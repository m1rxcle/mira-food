"use client"

import { useIntersection } from "react-use"

import { cn } from "@/shared/lib/utils"
import { Title } from "./title"
import { ProductCard } from "./product-card"
import { useEffect, useRef } from "react"
import { useCategoryStore } from "@/shared/store/category"
import { ProductWithRelations } from "@/@types/prisma"

interface Props {
	title: string
	items: ProductWithRelations[]
	listClassName?: string
	categoryId: number
	className?: string
}
export const ProductsGroupList: React.FC<Props> = ({ title, items, listClassName, categoryId, className }) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
	const intersectionRef = useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn("md:grid md:grid-cols-3 md:gap-[50px] sm:grid sm:grid-cols-1 ", listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	)
}
