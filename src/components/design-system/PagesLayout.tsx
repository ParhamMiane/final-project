import type { FC, PropsWithChildren } from "react"

const PagesLayout: FC<PropsWithChildren> = ({ children }) => {
    return(
        <main className='bg-slate-900 text-white min-h-screen p-8'>
            {children}
        </main>
    )
}
export default PagesLayout