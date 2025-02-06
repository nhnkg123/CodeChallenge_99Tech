import { ReactNode } from "react"

type ContentWrapperProps = {
  children: ReactNode
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({children}) => {
  return (
    <div className="bg-gray-200 w-full h-screen">
      {children}
    </div>
  )
}

export default ContentWrapper;