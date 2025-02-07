import React, { useState, useEffect, useRef } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import useOnclickOutside from "../hooks/useClickOutSide"

type SelectProps = {
  options:Array<string>,
  className: string,
  onSelect?: (option: string) => void
  selected?: string
}

const Select: React.FC<SelectProps> = ({options, className, onSelect, selected: defaultSelect}) => {
  const [selected, setSelected] = useState<string>(defaultSelect || "");
  const [isOpenPopup, SetIsOpenPopup] = useState<boolean>(false);

  const popupRef = useRef<HTMLDivElement>(null)

  useOnclickOutside(popupRef, () => {
    SetIsOpenPopup(false)
  })

  useEffect(() => {
    onSelect?.(selected);
  }, [selected, onSelect])

  const handleClickOption = (option: string) => {
    setSelected(option);
    SetIsOpenPopup(false);
  }

  const handleClickOpenPopup =  () => {
    SetIsOpenPopup(!isOpenPopup);
  }

  return (
    <div className="relative border border-blue-700 rounded px-2 py-2">
      <div className="flex gap-2 items-center" onClick={handleClickOpenPopup}>
        <img className="w-5 h-5" src={`src/assets/images/${selected}.svg`} alt="" />
        <div>{selected}</div>
        <div className="ms-7"><IoMdArrowDropdown /></div>
      </div>
      
      {isOpenPopup ? (<div className={`${className} absolute top-11 left-0 p-3 w-35`} ref ={popupRef}>
        {options.map((option, index) => (
          <div 
            key={index} 
            className="flex gap-2 items-center mb-2"
            onClick={() => handleClickOption(option)}
          >
            <img className="w-5 h-5" src={`src/assets/images/${option}.svg`} alt="" />
            <div>{option}</div>
          </div>
        ))}
      </div>) : null}
    </div>
  )
} 
export default Select;