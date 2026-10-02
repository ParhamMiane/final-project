import { createContext } from "react";
import type { Theme } from "../types/general";

export type GlobalContextType = {
    theme : Theme,
    toggleTheme?: () => void
}

export const GlobalContext = createContext<GlobalContextType>({
    theme: 'light',
})