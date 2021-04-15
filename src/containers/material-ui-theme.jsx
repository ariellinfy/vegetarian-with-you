import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { lightGreen, orange, deepOrange, yellow } from '@material-ui/core/colors';

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
            }
        },
        MuiButton: {
            root: {
                fontSize: '0.75rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.8rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.875rem'
                }
            },
            textSizeSmall: {
                fontSize: '0.725rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.765rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.8125rem'
                }
            },
            outlinedSizeSmall: {
                fontSize: '0.725rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.765rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.8125rem'
                }
            },
            containedSizeSmall: {
                fontSize: '0.725rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.765rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.8125rem'
                }
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.85rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.9rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1rem'
                }
            },
            input: {
                padding: '17px 14px',
                [defaultTheme.breakpoints.up("sm")]: {
                    padding: '18px 14px'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    padding: '18.5px 14px'
                }
            },
        },
        MuiOutlinedInput: {
            input: {
                padding: '17px 14px',
                [defaultTheme.breakpoints.up("sm")]: {
                    padding: '18px 14px'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    padding: '18.5px 14px'
                }
            },
        },
        MuiTab: {
            root: {
                fontSize: '0.745rem',
                padding: '5px 8px',
                [defaultTheme.breakpoints.up("sm")]: {
                    minWidth: '137.5px'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.875rem',
                    padding: '6px 12px'
                }
            },
        },
        MuiTableCell: {
            root: {
                fontSize: '0.775rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.8rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '0.875rem'
                }
            },
        },
        MuiFormLabel: {
            root: {
                fontSize: '0.9rem',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.95rem'
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1rem'
                }
            },
        },
        MuiMenu: {
            paper: {
                maxHeight: '80%'
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: '0.9rem',
                minHeight: '35px',
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: '0.95rem',
                    minHeight: '40px',
                },
                [defaultTheme.breakpoints.up("md")]: {
                    fontSize: '1rem',
                    minHeight: '48px',
                }
            },
        }
    }
  });
  
  theme = responsiveFontSizes(theme);

  export default theme;