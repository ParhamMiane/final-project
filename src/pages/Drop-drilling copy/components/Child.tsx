import { useContext } from "react";
import { UserContext } from "..";

const Child = () => {
    
    const user = useContext(UserContext)

    return(
        <div className="p-4 rounded-xl bg-gray-800 mt-4">
            <h1 className="text-4xl">Children component</h1>
            <p className="mt-4">{user?.firstName} {user?.lastName}</p>
        </div>
    )
}
export default Child;