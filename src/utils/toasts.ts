import { UseToastOptions } from "@chakra-ui/toast"

export const errorToast = (description: string): UseToastOptions => {
  return {
    title: "Error",
    description: description,
    status: "error",
    position: "top",
    duration: 3000,
    isClosable: true
  }
}

export const successToast = (description: string): UseToastOptions => {
  return {
    title: "Success",
    description: description,
    status: "success",
    position: "top",
    duration: 3000,
    isClosable: true
  }
}