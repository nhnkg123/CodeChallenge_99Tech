import React, { useState, useEffect } from "react"

type SelectProps = {
  options:Array<string>,
  className: string,
  onSelect?: (option: string) => void
}

const Select: React.FC<SelectProps> = ({options, className, onSelect}) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    onSelect?.(selected);
  }, [selected, onSelect])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  }

  return (
    <select className={className} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  )
} 
export default Select;