import {
  extendTheme,
  ThemeConfig,
  theme as chakraTheme,
} from '@chakra-ui/react'

const fonts = { heading: 'Inter' }

const components = {
  Text: {
    baseStyle: {
      fontWeight: 'bold',
    },
    variant: {
      label: (props) => ({
        fontWeight: '500',
        color: props.colorMode === 'dark' ? '#FFFFFF' : '#000000',
      }),
      largeHeader: (props) => ({
        fontSize: '6xl',
      }),
    },
  },
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
