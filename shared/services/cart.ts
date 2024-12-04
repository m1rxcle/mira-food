import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto"

export const fetchCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>("/cart")

	return data
}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity })

	return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.delete<CartDTO>("/cart/" + id)

	return data
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	const { data } = await axiosInstance.post<CartDTO>("/cart", values)

	return data
}
