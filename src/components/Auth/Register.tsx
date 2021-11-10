import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'
import { Button, FormControl, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { useUserStore } from '../../store/userStore'
import { IRegister } from '../../utils/interfaces'

function Register({ handleClose }: any) {
  const [data, setData] = useState<IRegister>({
    name: "",
    email: "",
    password: ""
  })

  const register = useUserStore(state => state.register)

  const handleRegister = async () => {
    if (data.name === "" || data.email === "" || data.password === "") {

    } else {
      const res = await register(data)
      if (res) {
        handleClose()
      }
    }
  }

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <Flex width="full" alignItems="center" direction="column" mb="4">
      <Stack spacing="4" w="full">
        <FormControl>
          <Input name="name" placeholder="Name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <Input name="email" placeholder="Email" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        </FormControl>
        <Button variant="solid" width="full" onClick={handleRegister}>Register</Button>
      </Stack>
    </Flex>
  )
}

export default Register
