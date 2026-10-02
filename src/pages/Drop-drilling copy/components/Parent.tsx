import Child from "./Child"

const Parent = () => {
    return(
        <div className="p-4 rounded-xl bg-gray-700">
            <h1 className="text-4xl">parent component</h1>
            <Child/>
        </div>
    )
}
export default Parent