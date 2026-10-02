import { create } from "zustand"
import type { Product } from "./products.store"

type CounterStore = {
    count: Record<number, number>

    cart: Product[]

    increment: (id: number) => void
    decrement: (id: number) => void
    addToCart: (product: Product) => void
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: {},

    cart: [],

    addToCart: (product) => {
        set((state) => ({
            cart: state.cart.some((item) => item.id === product.id)
                ? state.cart
                : [...state.cart, product],

            count: {
                ...state.count,
                [product.id]: 1
            }
        }))
    },

    increment: (id) => {
        set((state) => ({
            count: {
                ...state.count,
                [id]: (state.count[id] || 0) + 1
            }
        }))
    },

    decrement: (id) => {
    set((state) => {

        const newCount = Math.max(
            (state.count[id] || 0) - 1,
            0
        )

        const newCart = newCount === 0
            ? state.cart.filter((item) => item.id !== id)
            : state.cart

        return {
            count: {
                ...state.count,
                [id]: newCount
            },

            cart: newCart
        }
    })
}
}))