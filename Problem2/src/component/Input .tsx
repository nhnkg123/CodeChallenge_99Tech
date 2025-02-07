import { useFormContext } from 'react-hook-form'

type InputProps = {
  labelClassName: string,
  inputClassName:string,
  labelName: string,
  id:string,
  name: string,
  disable?:boolean,
  placeholder?: string,
  value?:string,
  type?:string,
  onChange?: (value:string) => void
}

const Input: React.FC<InputProps> = ({labelClassName, inputClassName, labelName, id, type, placeholder, disable = false, name}) => {
  const { register, formState: { errors } } = useFormContext()
  const inputClassNameIfError = `${inputClassName} ${disable ? 'bg-gray-300 cursor-not-allowed' : ''} ${errors[name] ? 'border-red-500' : ''}`

  return (
    <div className="grid grid-cols-3 items-center">
      <label className={labelClassName} htmlFor={id}>
        {labelName}
      </label>          
      <input 
        {...register(name)}
        className={`${inputClassNameIfError} col-span-2 mb-2`} 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        name={name}
      />
      {errors[name] ? <div className="text-red-500 text-xs italic col-end-4 col-span-2">{errors[name].message as string}</div> : null}
    </div>
  )
}

export default Input;