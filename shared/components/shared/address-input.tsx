"use client"

import { AddressSuggestions } from "react-dadata"
import "react-dadata/dist/react-dadata.css"

interface Props {
	onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return <AddressSuggestions token="b9b7404d9c87dd2718c6b1d4351f1bf4e72118a7" onChange={(data) => onChange?.(data?.value)} />
}
