import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { Suspense } from "react"

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					items: true,
					ingredients: true,
				},
			},
		},
	})

	return (
		<>
			<Container className="mt-10">
				<Title text={"Наши продукты"} size="lg" className="font-extrabold" />
			</Container>

			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Container className="pb-14 mt-10">
				<div className="flex gap-[80px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					{/* Cписок товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products} />
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
