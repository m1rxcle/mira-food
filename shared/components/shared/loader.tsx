import { cn } from "@/shared/lib/utils"
import React, { PropsWithChildren } from "react"

interface Props {
	isLoading?: boolean
	className?: string
}
export const Loader: React.FC<PropsWithChildren<Props>> = ({ isLoading, className }) => {
	return (
		<div className={cn("flex items-center justify-center bg-primary w-[100vw] h-[100vh]  ", className)}>
			{isLoading ? (
				<div>
					<span className="rotate-180 text-white text-[100px] transition-all duration-700 ease-in-out">M</span>
				</div>
			) : null}
		</div>
	)
}
