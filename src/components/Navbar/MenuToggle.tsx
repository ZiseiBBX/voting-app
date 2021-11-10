import { Box, useColorModeValue } from "@chakra-ui/react"
import { CgClose, BiMenu } from "react-icons/all"

interface MenuToggleProps {
  toggle(): void
  isOpen: boolean
}

function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  const iconColor = useColorModeValue("black", "white")

  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CgClose color={iconColor} /> : <BiMenu color={iconColor} />}
    </Box>
  )
}

export default MenuToggle
