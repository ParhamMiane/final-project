import { LuLoaderCircle } from "react-icons/lu";

import type { ReactElement } from "react";

type PropTypes = {
  type? : 'button' | 'submit' | 'reset',
  color? : 'green' | 'red' | 'blue' | 'gray',
  icon?: ReactElement,
  size? : 'md' | 'lg' | '2xl',
  isLoading? : boolean,
  children? : ReactElement | string | number | React.ReactNode,
  classname? : string,
  isDisabled?: boolean,
  onClick? : () => void,
  toolTip? : string,
}

function DsButton({
  type,
  color,
  children,
  classname,
  size,
  icon,
  isDisabled = false,
  isLoading,
  onClick,
  toolTip = '',
}:PropTypes) {
  let colorClass = "";
  let sizeClass = "";

  switch (color) {
    case "green":
      colorClass = "bg-green-500 text-black dark:text-white bg-green-500 dark:hover:bg-green-700";
      break;
    case "red":
      colorClass = "bg-red-500 text-black dark:text-white hover:bg-red-500 dark:hover:bg-red-700";
      break;
    case "blue":
      colorClass = "bg-blue-500 text-black dark:text-white hover:bg-blue-500 dark:hover:bg-blue-700";
      break;
    case "gray":
      colorClass = "bg-gray-500 text-black dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700";
      break;
  }
  switch (size) {
    case "2xl":
      sizeClass = "p-1.5 text-2xl";
      break;
    case "lg":
      sizeClass = "p-1 text-lg";
      break;
    case "md":
      sizeClass = "p-0.5 text-xs";
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      title={toolTip}
      className={`${classname} cursor-pointer rounded items-center flex transition-all justify-center ${colorClass} ${sizeClass}`}
      disabled={isLoading || isDisabled ? true : false}
    >
      {!isLoading && icon ? icon : null}
      {isLoading ? <LuLoaderCircle size={18} className='animate-spin' /> : undefined}
      {children}
    </button>
  );
}
export default DsButton;
