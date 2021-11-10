import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'
import { Button, FormControl, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { useUserStore } from '../../store/userStore'
import { ILogin } from '../../utils/interfaces'

function Login({ handleClose }: any) {
  const [data, setData] = useState<ILogin>({
    email: "",
    password: ""
  })
  const login = useUserStore(state => state.login)

  const handleLogin = async () => {
    if (data.email === "" || data.password === "") {

    } else {
      const res = await login(data)
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
          <Input name="email" placeholder="Email" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        </FormControl>
        <Button variant="solid" width="full" onClick={handleLogin}>Login</Button>
      </Stack>
    </Flex>
  )
}

export default Login
