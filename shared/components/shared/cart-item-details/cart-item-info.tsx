import { cn } from "@/shared/lib/utils"
interface Props {
	name: string
	details: string
	className?: string
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
	return (
		<div>
			<div className={cn("flex items-center justify-between", className)}>
				<h2 className="sm:text-sm md:text-lg font-bold flex-1 leading-6 sm:text-center md:text-start ">{name}</h2>
			</div>
			{details && <p className="text-xs text-gray-400 w-[90%] sm:text-center md:text-start">{details}</p>}
		</div>
	)
}
