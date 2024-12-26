"use client"
import { motion } from "motion/react"
import { cn } from "@/shared/lib/utils"
import React, { PropsWithChildren } from "react"

interface Props {
	className?: string
}
export const MainLoader: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 2000)
	}, [])
	return (
		<div className={cn("min-h-screen", className)}>
			{isLoading ? (
				<div className="w-screen h-screen bg-primary mx-auto flex items-center justify-center ">
					<motion.span
						animate={{
							y: [0, -50, 0], // Подъем и опускание
							rotateX: [0, 25, 0], // Наклон по оси X (3D-эффект)
							rotateY: [0, 360], // Вращение по оси Y
							color: "white", // Изменение цвета
							opacity: [1, 1],
						}}
						transition={{
							duration: 2, // Общая длительность
							ease: "easeInOut",
							type: "keyframes",
							repeat: Infinity, // Бесконечная анимация
						}}
						className="text-primary text-[120px] font-bold opacity-0"
					>
						М
					</motion.span>
				</div>
			) : (
				children
			)}
		</div>
	)
}
