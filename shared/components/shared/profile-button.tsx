import { useSession } from "next-auth/react"
import React from "react"
import { Button } from "../ui"
import { User } from "lucide-react"
import Link from "next/link"

interface Props {
	onClickSingIn?: () => void
	className?: string
}
export const ProfileButton: React.FC<Props> = ({ onClickSingIn, className }) => {
	const { data: session } = useSession()

	console.log(session, 999)

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSingIn} variant="outline" className="flex items-center gap-1 ">
					<User size={16} />
					Войти
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="outline" className="flex items-center gap-2 ">
						{session.user?.image ? <img src={session.user?.image} alt="avatar" className="w-6 h-6 rounded-full" /> : <User size={16} />}

						<div className="flex items-center gap-1 text-[15px]">{session.user?.name}</div>
					</Button>
				</Link>
			)}
		</div>
	)
}
