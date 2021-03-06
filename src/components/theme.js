import React from "react"
import { createMuiTheme} from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";


export const customLightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#006064',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#428e92',
        main: '#428e92',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // error: will use the default color
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      background:{
        paper: "#fff",
        default: "#fafafa",
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.14,
      }
    },
    typography: {
      body1: {
        fontSize: "1.1rem",
      },
      body2: {
        fontSize: "0.975rem",
      }
    }
  }); 
  export const customDarkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#006064',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#428e92',
        main: '#428e92',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // error: will use the default color
      text: {
        primary: "#fff",
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.5)',
        icon: 'rgba(255, 255, 255, 0.5)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      background:{
        paper: "#424242",
        default: "#303030",
      },
      action: {
        active: "#fff",
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      }
    },
    typography: {
      body1: {
        fontSize: "1.1rem",
      },
      body2: {
        fontSize: "0.975rem",
      }
    }
  }); 
