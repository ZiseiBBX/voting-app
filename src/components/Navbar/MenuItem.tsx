import {Link} from "react-router-dom"
import {Text } from "@chakra-ui/react"

interface MenuItemProps {
  children: any
  to: string
}

function MenuItem({ children, to = "/" }: MenuItemProps) {
  return (
    <Link to={to}>
      <Text display="block" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}

export default MenuItem
