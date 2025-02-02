"use client"

import { cn } from "@/shared/lib/utils"
import { useCategoryStore } from "@/shared/store/category"
import { Category } from "@prisma/client"

interface Props {
	className?: string
	items: Category[]
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId)
	return (
		<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
			{items.map(({ name, id }, index) => (
				<a
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl md:px-5 sm:px-2 sm:rounded-full",
						categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
					)}
					key={index}
					href={`/#${name}`}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	)
}
