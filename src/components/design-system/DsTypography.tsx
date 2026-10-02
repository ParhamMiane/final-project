import type { ReactElement } from "react";

type PropTypes = {
    element? : any,
    className? : string,
    children? : ReactElement | string,
}

const DsTypography = ({element, className, children}: PropTypes) => {
    const TagComponnent = element? element : 'span';
    return(
        <TagComponnent className={className}>{children}</TagComponnent>
    )
}
export default DsTypography