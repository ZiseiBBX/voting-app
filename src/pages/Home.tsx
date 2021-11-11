import { useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Select,
	CircularProgress,
	Progress,
	useColorModeValue,
	Button,
	Text,
	useToast,
	Box,
	Flex
} from "@chakra-ui/react";
import { useUserStore } from "../store/userStore";
import { Link } from "react-router-dom";
import { usePollStore } from "../store/pollStore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "@firebase/firestore";
import { IPoll } from "../utils/interfaces";
import { BaseSyntheticEvent } from "react";
import { errorToast, successToast } from "../utils/toasts";
import { customScrollbar } from "../utils/theme";
import PageContainer from "../components/Page/PageContainer";
import PageHeader from "../components/Page/PageHeader";

function Home() {
	const scrollbarColor = useColorModeValue("black", "white");
	const user = useUserStore((state) => state.user);
	const addVote = usePollStore((state) => state.addVote);
	const [selectedOption, setSelectedOption] = useState();
	const toast = useToast();

	const collectionRef = collection(useFirestore(), "polls");
	const pollQuery = query(collectionRef, orderBy("createdOn", "desc"));
	const { status, data: pollData } = useFirestoreCollectionData(pollQuery);

	if (status === "loading") return <PageContainer justifyContent="center"><CircularProgress isIndeterminate color="green.300" /></PageContainer>;
	if (status === "error") return <PageContainer justifyContent="center"><Text fontSize="lg">Oops! An error has occured.</Text></PageContainer>

	const data = pollData.map((poll) => ({ ...poll, id: poll.NO_ID_FIELD })) as IPoll[];

	return (
		<PageContainer>
			<Flex justifyContent="space-between" alignItems="center" w="full">
				<PageHeader title="Polls" />
				{user.email !== "" && (
					<Link to="/new-poll">
						<Button size="sm" variant="solid">
							Add New Poll
						</Button>
					</Link>
				)}
			</Flex>
			{data.length === 0 && (
				<Flex justifyContent="center" alignItems="center" h="md">
					No polls so far O_O
				</Flex>
			)}
			<Box w="full" mt="2">
				<Accordion
					height="auto"
					w="full"
					overflow="scroll"
					overflowX="hidden"
					css={{ ...customScrollbar(scrollbarColor), ":focus outline": "none" }}
					allowToggle
				>
					{data.map((datum) => {
						let totalVotes = 0;

						for (let option of datum.options) {
							totalVotes += option.votes ?? 0;
						}

						let voted = false;
            let optionVoted = ""

						for (let j = 0; j < datum.voteInfo.length; j++) {
							if (datum.voteInfo[j].email === user.email) {
                voted = true
                optionVoted = datum.voteInfo[j].option
              }
						}

						return (
							<AccordionItem key={`${datum.title}${datum.uid}`} border="1px" rounded="md" my="2">
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{datum.title}
									</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel px={["2", "10"]}>
									<Box>
										{datum.options.map((option, optionIndex) => {
											let progressValue = (option.votes / totalVotes) * 100;
											let canVote = false;

											if (user.email === "" || !voted) canVote = true;

											return (
												<Box px="4" py="1" my="2" key={option.title}>
													<Flex w="full" alignItems="center">
														<Text width="10" flex="1" fontWeight={optionVoted === option.title ? "bold" : "normal"}>
															{option.title}
														</Text>
														<Progress flex="4" mx="2" value={canVote ? 0 : progressValue} colorScheme="green" />
														<Text>{canVote ? "?" : `${option.votes}`}</Text>
													</Flex>
												</Box>
											);
										})}
										<Flex justifyContent="center" textAlign="center" px="20">
											{user.email === "" && (
												<Box>
													<Text fontWeight="hairline">You must be signed in to vote, please register or login</Text>
												</Box>
											)}
											{user.email !== "" && !voted && (
												<Flex>
													<Select
														mx="2"
														placeholder="Select option..."
														size="sm"
														minWidth="40"
														onChange={(e: BaseSyntheticEvent) => setSelectedOption(e.target.value)}
													>
														{datum.options.map((option) => {
															return (
																<option key={option.title} value={option.title}>
																	{option.title}
																</option>
															);
														})}
													</Select>
													<Button
														mx="2"
														px="8"
														size="sm"
														variant="solid"
														onClick={async () => {
															if (!selectedOption) {
																toast(errorToast("Option cannot be empty"));
															} else {
																let modifiedData = { ...datum };
																for (let i = 0; i < modifiedData.options.length; i++) {
																	if (modifiedData.options[i].title === selectedOption) {
																		modifiedData.options[i].votes += 1;
																		modifiedData.voteInfo.push({
																			email: user.email,
																			name: user.name,
																			uid: user.uid,
																			option: selectedOption,
																		});
																	}
																}
																const res = await addVote({ ...modifiedData, id: datum.id });
																if (res) {
																	toast(successToast("Voted"));
																	voted = true;
																} else {
																	toast(errorToast("Something went wrong"));
																}
															}
														}}
													>
														Vote
													</Button>
												</Flex>
											)}
											{voted && (
												<Box>
													<Text fontWeight="hairline">You have already voted</Text>
												</Box>
											)}
											{/* {voted && <Button mx="2" px="8" size="sm" variant="solid"><Link to="/poll-stat" onClick={() => {
                      updatePollData(datum)
                    }}>View Details</Link></Button>} */}
										</Flex>
									</Box>
								</AccordionPanel>
							</AccordionItem>
						);
					})}
				</Accordion>
			</Box>
		</PageContainer>
	);
}

export default Home;
