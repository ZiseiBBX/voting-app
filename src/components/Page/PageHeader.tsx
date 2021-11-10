import { Heading } from "@chakra-ui/react"

interface PageHeaderProps {
  title: string
}

function PageHeader({ title }: PageHeaderProps) {
  return (
    <Heading as="h4" size="md">{title}</Heading>
  )
}

export default PageHeader
