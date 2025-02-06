import { ReactNode } from "react"

type ContentWrapperProps = {
  children: ReactNode
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({children}) => {
  return (
    <div className="bg-gray-200 w-full h-full px-20 py-20">
      {children}
    </div>
  )
}

export default ContentWrapper;