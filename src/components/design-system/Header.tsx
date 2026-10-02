import { useEffect } from "react";
import { toast } from "react-hot-toast/headless";
import { FaMoon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdOutlineWbSunny } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import { DUMMY_BASE_URL } from "../../constants";
import { useAuthStore } from "../../stores/auth.store";
import { useCounterStore } from "../../stores/counter.store";
import { useGlobalStore } from "../../stores/global.store";


const Header = () => {
  const navigate = useNavigate()
  
  
  const {user, setUser} = useAuthStore()
  
  const {theme, toggleTheme} = useGlobalStore()
  const afterLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/login")
  }
  
  const links = [
    {title: "Home", link: "/app/home"},
    {title: "About us", link: "/app/about-us"},
    {title: "Posts", link: "/app/posts"},
    {title: "Todos", link: "/app/todos"},
    {title: "Drop-driling", link: "/app/dropDriling"},
    {title: "test-context", link: "/app/test-Context"},
    {title: "Products", link: "/app/products"},
  ]
  
  // const count = useCounterStore((state) => state.count)
  const cart = useCounterStore((state) => state.cart);
  
// const quantity = Object.values(count).reduce(
//     (total, count) => total + count,
//     0
// )

  const getMeApi = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`, 
      }, 
    })
    const data = await res.json()
    if(res.ok) {
      return data
    } else {
      toast.error(data.message)
      afterLogout()
    }
  } 

  const getMeData = async () => {
    const data = await getMeApi()
    setUser(data)

    
  }

  useEffect(() => {
    if(!sessionStorage.getItem("token")) {
      navigate("/login")
    } else {
      getMeData();
    }
  }, [])
  
  const logout = () => {
    if(!confirm("Are you sure you want to logout?")) {
      return
    } else {
      afterLogout()
    }
  }

    return (
  <header>
    <nav
      className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 fixed z-50 top-0 left-0 h-screen w-16 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden shadow-lg border-r border-gray-200 dark:border-slate-800 flex flex-col group"
    >
      <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-slate-800">
        <span
          onClick={toggleTheme}
          className="cursor-pointer text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
        >
          {theme === "light" ? <FaMoon size={22} /> : <MdOutlineWbSunny size={22} />}
        </span>
        <span className="font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-blue-600 dark:text-blue-400">
          My App
        </span>
      </div>

      <ul className="flex-1 overflow-hidden py-4">
        {links.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 mx-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
                to={item.link}
              >
                <span className="w-6 flex justify-center shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50"></span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-4">
        
        
        <Link
          to={"/app/cart"}
          className="flex items-center gap-4 px-1 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <div className="relative shrink-0">
            <HiMiniShoppingCart size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {cart.length}
              </span>
            )}
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">
            Cart
          </span>
        </Link>

        <Link
          to={"/app/profile"}
          className="flex items-center gap-3 px-1 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <img
            className="w-8 h-8 object-cover bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 shrink-0"
            src={user?.image || "https://via.placeholder.com/150"}
            alt="User Avatar"
          />
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <span className="text-sm font-semibold leading-tight">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Profile</span>
          </div>
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-4 px-1 py-2 text-red-500 hover:text-red-600 transition-colors w-full text-left"
        >
          <FiLogOut size={24} className="shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </nav>
  </header>
);
}

export default Header;