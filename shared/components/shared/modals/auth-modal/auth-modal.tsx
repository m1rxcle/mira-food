import { Button, Dialog } from "@/shared/components/ui"
import { DialogContent } from "@/shared/components/ui/dialog"
import { signIn } from "next-auth/react"
import React from "react"
import { LoginForm } from "./forms/login-form"
import { RegisterForm } from "./forms/register-form"

interface Props {
	open: boolean
	onClose: () => void
}
export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<"login" | "register">("login")

	const onSwitchType = () => {
		setType(type === "login" ? "register" : "login")
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="md:w-[450px] sm:w-full bg-white p-10">
				{type === "login" ? <LoginForm onCLose={handleClose} /> : <RegisterForm onCLose={handleClose} />}

				<hr />
				<div className="flex gap-2">
					<Button
						variant="secondary"
						onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						<img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" />
						GitHub
					</Button>
					<Button
						variant="secondary"
						onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						<img
							className="w-6 h-6"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9-uBexCbY-wzK-6K2z65xoP3e-aLoF1QL0Q&s"
							alt="github"
						/>
						Google
					</Button>
				</div>
				<Button variant="outline" onClick={onSwitchType} className="h-12" type="button">
					{type !== "login" ? "Войти" : "Регистрация"}
				</Button>
			</DialogContent>
		</Dialog>
	)
}
