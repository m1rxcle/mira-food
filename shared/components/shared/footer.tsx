import { cn } from "@/shared/lib/utils"
import React from "react"
import { Container } from "./container"
import { ChefHat } from "lucide-react"
import Link from "next/link"

interface Props {
	className?: string
}
export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("bg-black/90 h-[650px] w-full", className)}>
			<div className="w-full h-[40px] bg-primary relative">
				<Container>
					<div className="flex justify-center mt-2 items-center gap-10 mb-10">
						<ChefHat size={40} color="white" />
						<h1 className="text-white text-xl">Проверьте нашу кухню в Калининграде — мы вас удивим !</h1>
					</div>
					<div className="flex justify-between items-start gap-32">
						<div className="grid grid-cols-4  text-md w-[70%]">
							<div className=" text-white w-[70%]">
								<ul className="text-white">Mira Food</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">О нас</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Mira-книга</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Блог &quot;Сила ума&quot;</ul>
							</div>
							<div className=" text-neutral-500 w-[70%] ">
								<ul className="text-white ">Работа</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">В пиццерии</ul>
							</div>
							<div className=" text-neutral-500 w-[70%]">
								<ul className="text-white">Партнерам</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Франшиза</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Инвестиции</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Поставщикам</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Предложить помещение</ul>
							</div>
							<div className=" text-neutral-500 ">
								<ul className="text-white">Это интересно</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Почему мы готовим без перчаток ?</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Экскурсии и мастер-классы</ul>
								<ul className="text-neutral-500 hover:text-white cursor-pointer">Корпоративные заказы</ul>
							</div>
						</div>
						<div>
							<img src="https://cdn.dodostatic.net/site-static/dist/assets/bdd1b4f711da594de675..png" alt="pizza" width={350} />
						</div>
					</div>
					<div className="grid grid-cols-3 mb-20">
						<div className="flex flex-col gap-3">
							<h1 className="text-white text-2xl">255 202 212 рублей</h1>
							<p className="text-neutral-500 w-[280px]">выручка российской сети в этом мясяце. В прошлом - 8 635 402 120 рублей.</p>
						</div>
						<div className="flex flex-col gap-3">
							<h1 className="text-white text-2xl">1 181 пиццерия</h1>
							<p className="text-neutral-500 w-[280px]">в 24 странах, от Великобритании до Нигерии.</p>
						</div>
					</div>
					<div className="text-xl text-white m-auto h-auto text-center">
						<span className="text-neutral-400">
							&copy; powered by{" "}
							<Link href="https://github.com/m1rxcle" className="text-purple-300">
								m1rxcle
							</Link>{" "}
							with love <div className="text-red animate-ping inline">❤️</div>
						</span>
					</div>
				</Container>
			</div>
		</div>
	)
}
