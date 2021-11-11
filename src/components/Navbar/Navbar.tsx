import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/layout'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
import React, { useState } from 'react'
import { useUser } from 'reactfire'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import { useUserStore } from '../../store/userStore'
import MenuItem from './MenuItem'
import NavbarLogo from './NavbarLogo'
import MenuToggle from './MenuToggle'
import MenuButton from './MenuButton'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const { colorMode, toggleColorMode } = useColorMode()
  const { status, data } = useUser()
  const logout = useUserStore(state => state.logout)

  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  const handleLoginModalOpen = () => setLoginModal(true)
  const handleLoginModalClose = () => setLoginModal(false)

  const handleRegisterModalOpen = () => setRegisterModal(true)
  const handleRegisterModalClose = () => setRegisterModal(false)

  return (
    <Flex
      as="nav"
      position="fixed"
      zIndex="100"
      align="center"
      justify="space-between"
      backdropFilter="saturate(100%) blur(5px)"
      wrap="wrap"
      w="100%"
      py="4"
      px={["4", "6", "8" ,"8"]}
    >
      <NavbarLogo />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={[2, 2, 4, 8]}
          align="center"
          justify={["center", "center", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          {/* <MenuItem to="/profile">Profile</MenuItem> */}
          {(!data && status === "success") && <MenuButton text="Login" handleModalOpen={handleLoginModalOpen} />}
          {(!data && status === "success") && <MenuButton text="Register" handleModalOpen={handleRegisterModalOpen} />}
          {(data && status === "success") && <MenuButton text="Logout" handleModalOpen={logout} />}
          <Button variant="solid" mx="2" size="sm" onClick={toggleColorMode}>{colorMode === "light" ? "Dark" : "Light"}</Button>
        </Stack>
      </Box>

      <Modal isCentered isOpen={loginModal} onClose={handleLoginModalClose}>
        <ModalOverlay />
        <ModalContent mx="2">
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Login handleClose={handleLoginModalClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={registerModal} onClose={handleRegisterModalClose}>
        <ModalOverlay />
        <ModalContent mx="2">
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Register handleClose={handleRegisterModalClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )

  // return (
  //   <Flex width="full">
  //     <Box boxShadow="lg" width="full" px="20" py="2">
  //       <Flex justifyContent="space-between" alignItems="center">
  //         <Heading size="md">Poll App</Heading>
  //         <Spacer></Spacer>
  //         <Flex alignItems="center" height="8">
  //           <Box mx="3" cursor="pointer"><Link to="/">Home</Link></Box>
  //           <Box mx="3" cursor="pointer"><Link to="/profile">Profile</Link></Box>
  //           {(!data && status === "success") && <Button variant="ghost" size="sm" onClick={handleLoginModalOpen}>Login</Button>}
  //           {(!data && status === "success") && <Button variant="ghost" size="sm" onClick={handleRegisterModalOpen}>Register</Button>}
  //           {(data && status === "success") && <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>}
            // <Button variant="solid" mx="2" size="sm" onClick={toggleColorMode}>{colorMode === "light" ? "Dark" : "Light"}</Button>
  //         </Flex>
  //       </Flex>
  //     </Box>

      // <Modal isCentered isOpen={loginModal} onClose={handleLoginModalClose}>
      //   <ModalOverlay />
      //   <ModalContent>
      //     <ModalHeader>Login</ModalHeader>
      //     <ModalCloseButton />
      //     <ModalBody>
      //       <Login handleClose={handleLoginModalClose} />
      //     </ModalBody>
      //   </ModalContent>
      // </Modal>

      // <Modal isCentered isOpen={registerModal} onClose={handleRegisterModalClose}>
      //   <ModalOverlay />
      //   <ModalContent>
      //     <ModalHeader>Register</ModalHeader>
      //     <ModalCloseButton />
      //     <ModalBody>
      //       <Register handleClose={handleRegisterModalClose} />
      //     </ModalBody>
      //   </ModalContent>
      // </Modal>
  //   </Flex>
  // )
}

export default Navbar
