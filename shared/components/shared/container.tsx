import { cn } from "@/shared/lib/utils"
import React from "react"

interface Props {
	className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn("sm:mx-10 md:mx-auto md:max-w-[1280px] ", className)}>{children}</div>
}
