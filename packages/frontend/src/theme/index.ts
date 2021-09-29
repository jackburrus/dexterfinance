import {
  extendTheme,
  ThemeConfig,
  theme as chakraTheme,
} from '@chakra-ui/react'

const fonts = { heading: 'Inter', body: 'Inter' }

const textStyles = {
  body: {
    fontFamily: 'Times New Roman, sans-serif',
  },
  heading: {
    fontFamily: 'Times New Roman, sans-serif',
  },
  mono: {
    fontFamily: 'Oxygen',
    // fontWeight: 'Bold',
  },
}

// const components = {
//   Text: {
//     baseStyle: (props) => ({
//       fontWeight: 'bold',
//       color: props.colorMode === 'dark' ? '#FFFFFF' : 'white',
//     }),
//     variant: {
//       label: (props) => ({
//         fontWeight: '500',
//         // color: props.colorMode === 'dark' ? '#FFFFFF' : '#000000',
//         color: props.colorMode === 'dark' ? '#FFFFFF' : 'red',
//       }),
//       largeHeader: (props) => ({
//         fontSize: '6xl',
//       }),
//     },
//   },
//   Box: {
//     baseStyle: (props) => ({
//       // fontWeight: 'bold',
//       // color: props.colorMode === 'dark' ? '#FFFFFF' : 'white',
//     }),
//     variant: {
//       card: (props) => ({
//         // boxShadow: props.colorMode == 'light' ? '1px 0 15px 2px #b6bdca' : null,
//         boxShadow: '1px 0 15px 2px #b6bdca',
//       }),
//     },
//   },
// }

const config: ThemeConfig = {
  ...chakraTheme.config,
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const overrides = {
  ...config,
  fonts,
  textStyles,
  // components,
  // components: {

  // }
}

// const theme = extendTheme(overrides)
const theme = extendTheme(overrides)

export default theme
