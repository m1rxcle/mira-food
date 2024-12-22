import { prisma } from "@/prisma/prisma-client"

export interface GetSearchParams {
	query?: string
	sortBy?: string
	pizzaType?: string
	sizes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
	limit?: string
	page?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(",").map(Number)
	const pizzaType = params.pizzaType?.split(",").map(Number)
	const ingredientsIdArr = params.ingredients?.split(",").map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: "desc",
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaType,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: "asc",
						},
					},
					ingredients: true,
				},
			},
		},
	})
	return categories
}
