import {
  extendTheme,
  ThemeConfig,
  theme as chakraTheme,
} from '@chakra-ui/react'

const fonts = { heading: 'Inter', body: 'Inter' }

const components = {
  Text: {
    baseStyle: (props) => ({
      fontWeight: 'bold',
      color: props.colorMode === 'dark' ? '#FFFFFF' : 'white',
    }),
    variant: {
      label: (props) => ({
        fontWeight: '500',
        // color: props.colorMode === 'dark' ? '#FFFFFF' : '#000000',
        color: props.colorMode === 'dark' ? '#FFFFFF' : 'red',
      }),
      largeHeader: (props) => ({
        fontSize: '6xl',
      }),
    },
  },
  // Input: {
  //   variant: {
  //     main: (props) => ({
  //       backgroundColor: props.colorMode === 'dark' ? '#2D3748' : '#DEE7F4',
  //     }),
  //   },
  // },
}

const config: ThemeConfig = {
  ...chakraTheme.config,
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const overrides = {
  ...config,
  fonts,
  components,
}

const theme = extendTheme(overrides)

export default theme
