import { useState } from "react"
import { Flex } from "@chakra-ui/layout"
import { Button, FormControl, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { IPoll } from "../utils/interfaces"
import { errorToast, successToast } from "../utils/toasts"
import { usePollStore } from "../store/pollStore"
import { useUserStore } from "../store/userStore"
import { useNavigate } from "react-router-dom"
import PageContainer from "../components/Page/PageContainer"

function NewPoll() {
  const [data, setData] = useState<IPoll>({
    title: "",
    options: [
      {
        title: "",
        votes: 0,
      }
    ],
    name: "",
    uid: "",
    voteInfo: [],
    createdOn: new Date()
  })

  const toast = useToast()
  const addNewPoll = usePollStore(state => state.addNewPoll)
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (data.title === "") {
      toast(errorToast("Title cannot be empty"))
      return
    }
    if (data.options.length < 2) {
      toast(errorToast("Must have atleast 2 options"))
      return
    }
    else {
      for (let i = 0; i < data.options.length; i++) {
        if (data.options[i].title === "") {
          toast(errorToast("Option(s) cannot be empty"))
          return
        }
      }
    }

    const res = await addNewPoll({...data, name: user.name, uid: user.uid })
    if (res) {
      toast(successToast("Poll added"))
      navigate("/")
    }
  }

  const handleEnter = () => {
    if (data.options.length === 6) {
      toast(errorToast("Cannot add more than 6 options"))
    } else {
      setData({...data, options: [...data.options, { title: "", votes: 0 }]})
    }
  }

  const handleChange = (event: any, index: number) => {
    let newFormValues = [...data.options]
    newFormValues[index].title = event.target.value
    setData({...data, options: newFormValues})
  }

  return (
    <PageContainer>
      <Stack spacing="4" placeContent="center" width={["sm", "md", "lg", "xl"]} px="2">
        <Text fontSize="xl" fontWeight="bold">New Poll</Text>
        <FormControl>
          <Input name="title" placeholder="Title" onChange={(e: any) => setData({ ...data, title: e.target.value })} />
        </FormControl>
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Options</Text>
          <Button size="sm" variant="solid" onClick={() => {
            if (data.options.length === 6) {
              toast(errorToast("Cannot add more than 6 options"))
            } else {
              setData({...data, options: [...data.options, { title: "", votes: 0 }]})
            }
          }}>Add</Button>
        </Flex>
        {data.options.map((option, i) => {
          return (
            <Flex alignItems="center" key={i}>
              <FormControl>
                <Input onKeyPress={(e: any) => {
                  if (e.key === "Enter") handleEnter()
                }} size="sm" variant="outline" placeholder={`Option ${i + 1}`} value={option.title} onChange={(e: any) => handleChange(e, i)} />
              </FormControl>
              {data.options.length > 1 && <Button variant="outline" size="sm" ml="1" onClick={() => {
                let temp = [...data.options]
                temp.splice(i, 1)
                setData({...data, options: temp})
              }}>x</Button>}
            </Flex>
          )
        })}
        <Button variant="solid" onClick={handleSubmit}>Submit</Button>
      </Stack>
    </PageContainer>
  )
}

export default NewPoll
