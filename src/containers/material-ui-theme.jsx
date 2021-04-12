import { createMuiTheme, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import { lightGreen, green, orange, deepOrange, yellow } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme();

let theme = createMuiTheme({
    ...defaultTheme,
    palette: {
      primary: {
        main: lightGreen[800],
      },
      secondary: {
        main: orange[800],
      },
      tertiary: {
        main: yellow[500],
      },
      warning: {
        main: deepOrange[600],
      },
      
    },
    typography: {
      fontFamily: '-apple-system, Quicksand, sans-serif'
    },
    overrides: {
        MuiTypography: {
            body1: {
                fontSize: '1rem',
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.85rem'
                }
            },
            body2: {
                fontSize: '0.875rem',
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.7rem'
                }
            },
            subtitle1: {
                fontSize: '1.15rem',
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1rem'
                }
            },
            subtitle2: {
                fontSize: '0.95rem',
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.8rem'
                }
            },
            button: {
                fontSize: '1rem',
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.75rem'
                }
            },
        }
    }
  });
  
  theme = responsiveFontSizes(theme);

  export default theme;