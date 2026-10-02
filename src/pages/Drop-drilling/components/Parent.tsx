import type { User } from "../../../types/user"
import Child from "./Child"

const Parent = ({user}: {user:User}) => {
    return(
        <div className="p-4 rounded-xl bg-gray-700">
            <h1 className="text-4xl">parent component</h1>
            <Child user={user }/>
        </div>
    )
}
export default Parent