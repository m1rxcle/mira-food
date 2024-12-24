"use client"

import { Api } from "@/shared/services/api-client"
import { IStory } from "@/shared/services/stories"
import React from "react"
import { Container } from "./container"
import { cn } from "@/shared/lib/utils"
import { X } from "lucide-react"
import ReactStories from "react-insta-stories"

interface Props {
	className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([])
	const [open, setOpen] = React.useState(false)
	const [selectedStory, setSelectedStory] = React.useState<IStory>()

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}

		fetchStories()
	}, [])

	const onClickStory = (story: IStory) => {
		setSelectedStory(story)

		if (story.items.length > 0) {
			setOpen(true)
		}
	}

	return (
		<>
			<Container className={cn("sm:w-[100px] md:w-full sm:flex sm:items-center sm:justify-between sm:gap-1 md:gap-2 md:my-10", className)}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div key={index} className="md:w-[200px] md:h-[250px] sm:w-[50px] sm:h-[50px] bg-gray-200 rounded-md animate-pulse" />
					))}

				{stories.map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						className="rounded-md cursor-pointer md:w-[200px] md:h-[250px] sm:w-[70px] sm:h-[100px] object-cover"
						src={story.previewImageUrl}
						alt="logo"
					/>
				))}

				{open && (
					<div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
						<div className="relative" style={{ width: 520 }}>
							<button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
								<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	)
}
