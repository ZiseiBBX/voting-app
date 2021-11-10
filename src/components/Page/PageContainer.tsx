import { Flex } from "@chakra-ui/react"



function PageContainer({ children }: any) {
  return (
    <Flex h="full" w="full" direction="column" alignItems="center">
      {children}
    </Flex>
  )
}

export default PageContainer
