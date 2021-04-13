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
            h6: {
                fontSize: '1.125rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '1.2rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1.35rem'
                }
            },
            body1: {
                fontSize: '0.85rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.92rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.95rem'
                }
            },
            body2: {
                fontSize: '0.78rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.875rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.875rem'
                }
            },
            subtitle1: {
                fontSize: '0.875rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '1rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1.1rem'
                }
            },
            subtitle2: {
                fontSize: '0.8rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.85rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.95rem'
                }
            },
            button: {
                fontSize: '0.75rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.875rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1rem'
                }
            },
        }
    }
  });
  
  theme = responsiveFontSizes(theme);

  export default theme;