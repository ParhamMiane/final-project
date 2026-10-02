import { useNavigate } from "react-router";
import Button from "./DsButton";
import type { FC } from "react";

type Proptypes = {
    children? : string,
    backRoute? : string,
    show? : boolean,
}

const PageHeader: FC<Proptypes> = ({ children, backRoute, show = false }) => {
  const navigate = useNavigate();
  const back = () => {
    if(backRoute){
        navigate(backRoute)
    }else{
        navigate(-1)
    }
    // backRoute ? navigate(backRoute) : navigate(-1);
    //navigate(backRoute || -1);
  };

  return (
    <div className="flex justify-between items-center mb-4 ml-10">
      <h1 className="text-4xl font-bold mb-5">{children}</h1>
      {show && (
        <Button color="red" size="lg" onClick={back}>
          Back
        </Button>
      )}
    </div>
  );
};
export default PageHeader;
