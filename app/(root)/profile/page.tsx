import { prisma } from "@/prisma/prisma-client"
import { Container, ProfileForm } from "@/shared/components"
import { getUserSession } from "@/shared/lib/get-user-session"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
	const session = await getUserSession()

	if (!session) {
		return redirect("/not-auth")
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session?.id),
		},
	})

	if (!user) {
		return redirect("/not-auth")
	}

	return (
		<Container className="flex items-center justify-between ">
			<ProfileForm data={user} />
			<img src="/assets/images/update-data.png" alt="update-data" className="w-[500px] h-[500px] md:block sm:hidden" />
		</Container>
	)
}
