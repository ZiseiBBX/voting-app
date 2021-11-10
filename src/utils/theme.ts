import { extendTheme, ThemeConfig } from "@chakra-ui/react"

// 2. Add your color mode config
const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

function customScrollbar(color: any) {
  return {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: color,
      borderRadius: '24px',
    },
  }
}

export { customScrollbar }

export default theme