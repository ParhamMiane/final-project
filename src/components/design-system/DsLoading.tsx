
type PropTypes = {
    text? : string
}


const DsLoading = ({text}: PropTypes) => {
    return(
        <div className="p-4 rounded-lg text-blue-500 font-bold text-2xl ">
            {/* <LuLoaderPinwheel className="animate-spin"/> */}
            {text? text : 'Loading...'}
        </div>
    )
}

export default DsLoading