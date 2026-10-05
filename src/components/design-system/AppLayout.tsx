import { Outlet } from "react-router"
import Header from "./Header"

const AppLayout = () => {
  
 

  return(
      <>
        <Header />
        <main className='bg-slate-300 text-black dark:bg-slate-900 dark:text-white min-h-screen p-8 pl-20'>
          <Outlet />
        </main>
      </>


)
}
export default AppLayout