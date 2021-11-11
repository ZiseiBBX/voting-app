import { Flex } from "@chakra-ui/react";

function PageContainer({ children, justifyContent }: any) {
	return (
		<Flex
			h="full"
			w="full"
			direction="column"
			justifyContent={justifyContent}
			alignItems="center"
			mt={["10", "10", "20", "20"]}
			px={["5", "10", "20", "20"]}
		>
			{children}
		</Flex>
	);
}

export default PageContainer;
