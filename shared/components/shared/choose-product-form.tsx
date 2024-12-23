import { cn } from "@/shared/lib/utils"
import { Title } from "./title"
import { Button } from "../ui"

interface Props {
	imageUrl: string
	name: string
	price: number
	loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

/**
 * Форма продукта
 *
 *
 */

export const ChooseProductForm: React.FC<Props> = ({ imageUrl, name, price, loading, onSubmit, className }) => {
	return (
		<div className={cn("md:flex md:flex-row md:flex-1 sm:flex-col", className)}>
			<div className="flex items-center justify-center flex-1 relative md:w-full sm:w-screen">
				<img src={imageUrl} alt={name} className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]" />
			</div>

			<div className="md:w-[490px] sm:w-screen bg-[#f7f6f5] md:p-7 sm:p-0">
				<Title text={name} size="md" className="font-extrabold mb-1 sm:text-center md:text-start" />

				<Button loading={loading} onClick={() => onSubmit?.()} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за {price}
				</Button>
			</div>
		</div>
	)
}
