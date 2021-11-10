import { Box, Text } from "@chakra-ui/react"

interface MenuButtonProps {
  handleModalOpen(): void
  text: string
}

function MenuButton({ handleModalOpen, text }: MenuButtonProps) {
  return (
    <Box cursor="pointer"><Text onClick={handleModalOpen}>{text}</Text></Box>
  )
}

export default MenuButton
