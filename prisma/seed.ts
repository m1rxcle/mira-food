import { Prisma } from "@prisma/client"
import { categories, ingredients, products } from "./constans"
import { prisma } from "./prisma-client"
import { hashSync } from "bcrypt"

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({ productId, pizzaType, size }: { productId: number; pizzaType?: 1 | 2; size?: 20 | 30 | 40 }) => {
	return {
		productId,
		price: randomDecimalNumber(190, 600),
		pizzaType,
		size,
	} as Prisma.ProductItemUncheckedCreateInput
}
async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: "User",
				email: "user@test.ru",
				password: hashSync("111", 10),
				role: "USER",
				verified: new Date(),
			},
			{
				fullName: "Admin",
				email: "Admin1@test.ru",
				password: hashSync("11111", 10),
				role: "ADMIN",
				verified: new Date(),
			},
		],
	})

	await prisma.category.createMany({ data: categories })

	await prisma.ingredient.createMany({ data: ingredients })

	await prisma.product.createMany({ data: products })

	const pizza1 = await prisma.product.create({
		data: {
			name: "Пепперони фреш 🍕",
			imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: "🍕 Сырная",
			imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: "🍕 Чоризо фреш ",
			imageUrl: "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 15),
			},
		},
	})

	const pizza4 = await prisma.product.create({
		data: {
			name: "🍕 Кола-барбекю",
			imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 20),
			},
		},
	})

	const pizza5 = await prisma.product.create({
		data: {
			name: "🍕 Бефстроганов",
			imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(4, 15),
			},
		},
	})

	const pizza6 = await prisma.product.create({
		data: {
			name: "🍕 Мясная с аджикой ",
			imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF438E93884BFEBFE79D11095AE2D4.avif",
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 15),
			},
		},
	})

	await prisma.productItem.createMany({
		data: [
			// Пицца "Пепперони фреш"
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			// Пицца "Сырная"
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			// Пицца "Чоризо фреш"
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

			// Пицца "Кола-барбекю"
			generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),

			// Пицца "Бефстроганов"
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

			// Пицца "Мясная с аджикой"
			generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40 }),

			// Остальные продукты
			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 }),
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: "123",
			},
			{
				userId: 2,
				totalAmount: 0,
				token: "456",
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})
	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
			},
			{
				previewImageUrl:
					"https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
			},
		],
	})

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl: "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl: "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl: "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl: "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: 1,
				sourceUrl: "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
			},
		],
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
}
async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
