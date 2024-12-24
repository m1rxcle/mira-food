"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils"
import { useRouter } from "next/navigation"
import { ProductWithRelations } from "@/@types/prisma"
import { ProductForm } from "../product-form"

interface Props {
	product: ProductWithRelations
	className?: string
}
export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"md:p-0 md:w-[1060px] md:max-w-[1060px] md:min-h-[550px] sm:w-full sm:max-w-full sm:min-h-[50vh] sm:py-10 sm:px-0 bg-white overflow-hidden ",
					className
				)}
			>
				<DialogTitle className="hidden" />
				<ProductForm product={product} onSubmit={() => router.back()} />
				<DialogDescription className="hidden" />
			</DialogContent>
		</Dialog>
	)
}
