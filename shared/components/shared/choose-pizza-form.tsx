import { cn } from "@/shared/lib/utils"
import { Title } from "./title"
import { Button } from "../ui"
import { PizzaImage } from "./pizza-image"
import { GroupVariants } from "./group-variants"
import { PizzaSize, PizzaType, PizzaTypes } from "@/shared/constans/pizza"
import { Ingredient, ProductItem } from "@prisma/client"
import { IngredientItem } from "./ingredient-item"
import { getPizzaDetails } from "@/shared/lib"
import { usePizzaOptions } from "@/shared/hooks"

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	items: ProductItem[]
	loading?: boolean
	onSubmit: (itemId: number, ingredient: number[]) => void
	className?: string
}

/**
 * Форма пиццы
 *
 *
 */

export const ChoosePizzaForm: React.FC<Props> = ({ imageUrl, name, ingredients, items, onSubmit, loading, className }) => {
	const { size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient } = usePizzaOptions(items)
	const { totalPrice, textDetails } = getPizzaDetails(type, size, items, ingredients, selectedIngredients)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}

	return (
		<div className={cn("md:flex md:flex-row md:flex-1 sm:flex-col relative", className)}>
			<PizzaImage imageUrl={imageUrl} size={size} />
			<div className="md:w-[490px] bg-[#f7f6f5] md:p-7 sm:p-3">
				<Title text={`${name}`} size="md" className="font-extrabold mb-1 sm:text-center md:text-start" />
				<p className="text-gray-400 sm:text-center md:text-start">{textDetails}</p>

				<div className="flex flex-col gap-3 mt-5 mb-5">
					<GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
					<GroupVariants items={PizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
				</div>

				<div className="bg-gray-50 p-5 rounded-md md:h-[420px] sm:h-[300px]  overflow-auto scrollbar">
					<div className="grid grid-cols-3 sm:gap-3 md:gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="sm:absolute sm:bottom-0 sm:left-0  md:relative h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {totalPrice} ₽{" "}
				</Button>
			</div>
		</div>
	)
}
