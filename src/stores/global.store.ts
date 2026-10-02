import { create } from "zustand"
import type { Theme } from "../types/general"

type GlobalStore = {
    theme: Theme
    toggleTheme: () => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    theme: 'dark',
    
    toggleTheme: () => {

        set((state) => {
            const newTheme : Theme = state.theme === 'dark'? 'light' : 'dark'

            document.documentElement.classList.toggle('dark', newTheme == 'dark')

            return{theme: newTheme}

        })

    },

}))