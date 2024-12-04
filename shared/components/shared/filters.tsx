"use client"

import React from "react"
import { Title } from "./title"
import { Input } from "../ui"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { useQueryFilters, useFilters, useIngredients } from "@/shared/hooks"

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryFilters(filters)

	const items = ingredients.map((item) => ({
		text: item.name,
		value: String(item.id),
	}))

	const updatePrices = (prices: number[]) => {
		filters.setPrice("priceFrom", prices[0])
		filters.setPrice("priceTo", prices[1])
	}

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/*  Верхние Чекбоксы  */}

			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaTypes"
				className="mb-5"
				onClickCheckbox={filters.setPizzaTypes}
				items={[
					{ text: "Тонкое", value: "1" },
					{ text: "Традиционное", value: "2" },
				]}
				selected={filters.pizzaTypes}
			/>

			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5"
				onClickCheckbox={filters.setSizes}
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" },
				]}
				selected={filters.sizes}
			/>

			{/*  Фильтр цен */}

			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						className="h-8"
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrice("priceFrom", Number(e.target.value))}
					/>
					<Input
						className="h-8"
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrice("priceTo", Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					className="cursor-pointer"
					min={0}
					max={1000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			{/*  Фильтр ингредиентов */}

			<CheckboxFiltersGroup
				title="Ингредиенты"
				name="ingredients"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
			/>
		</div>
	)
}
