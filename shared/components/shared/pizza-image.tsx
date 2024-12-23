import { cn } from "@/shared/lib/utils"
import React from "react"

interface Props {
	className?: string
	imageUrl: string
	size: 20 | 30 | 40
}
export const PizzaImage: React.FC<Props> = ({ size, imageUrl, className }) => {
	return (
		<div className={cn("flex items-center justify-center flex-1 w-full  relative", className)}>
			<img
				src={imageUrl}
				alt="logo"
				className={cn("relative left-2 top-2 transition-all z-10 duration-300", {
					"md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px]": size === 20,
					"md:w-[400px] md:h-[400px] sm:w-[220px] sm:h-[220px]": size === 30,
					"md:w-[500px] md:h-[500px] sm:w-[250px] sm:h-[250px]": size === 40,
				})}
			/>

			<div className="sm:hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
			<div className="sm:hidden md:block  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
		</div>
	)
}
