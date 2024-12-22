import { cn } from "@/shared/lib/utils"
import { ArrowUpDown } from "lucide-react"
import React from "react"

interface Props {
	className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("md:inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer sm:hidden", className)}>
			<ArrowUpDown size={16} />
			<b>Сортировка</b>
			<b className="text-primary">популярное</b>
		</div>
	)
}
