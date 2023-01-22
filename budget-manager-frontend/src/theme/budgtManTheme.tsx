import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";


export const defaultFontSet = "'Helvetica Now Text'";



const breakpoints = {
    values: {
      xs: 0,
      sm: 480, //600,
      md: 768, //900,
      lg: 1024, //1200,
      xl: 1280, //1440,
    },
  }
  

const budgtManTheme = createTheme({
    breakpoints: breakpoints,

    palette: {
     
        primary: {
          light: "#3D8aaa",
          main: "#3D892D",
          dark:"#AAA92D"
        },
       
        text: {
          primary: "#883D1E",
        },
        error: {
          main: "#F21B3F",
        },
        success: {
          main: "#192954"
        },
    },

    typography: {
        fontFamily: defaultFontSet,
        h1: {
          color: "#4B286D",
          fontFamily: "Helvetica Now Text",
          fontStyle: "normal",
          fontSize: "44px",
          fontWeight: "325",
          lineHeight: "52px",
          letterSpacing: "-0.01em",
          [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
            fontSize: '28px',
            lineHeight: "36px",
          },
        },
        h2: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontStyle: "normal",
          fontSize: "32px",
          fontWeight: "400",
          lineHeight: "40px",
          letterSpacing: "-0.01em",
          [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
            fontSize: '22px',
            lineHeight: "26px",
          },
        },
        h3: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontStyle: "normal",
          fontSize: "28px",
          fontWeight: "325",
          lineHeight: "36px",
          letterSpacing: "-0.6%",
          [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
            fontSize: '18px',
            lineHeight: "20px",
          },
        },
        h4: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontStyle: "normal",
          fontSize: "22px",
          fontWeight: "400",
          lineHeight: "26px",
          letterSpacing: "-1%",
          [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
            fontSize: '16px',
            lineHeight: "20px",
          },
        },
        body1: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontStyle: "normal",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "-0.01em",
        },
        body2: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "-0.01em",
        },
        subtitle1: {
          color: "#2C2E30",
          fontFamily: "Helvetica Now Text",
          fontSize: "16px",
          fontWeight: "325",
          lineHeight: "20px",
          letterSpacing: "-0.01em",
        },
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            h1: {
              color: '#4F2D2D',
            },
            h2: {
              color: '#883D1E',
            },
            body1: {
              color: '#4F2D2D',
            },
          },
        },
    
        MuiGrid: {
          styleOverrides: {
            root: {
              fontFamily: "Helvetica Now Text",
              fontWeight: "325"
            },
          },
        },
    
       MuiAppBar: {
          styleOverrides: {
            root: {
              /*position: "static",*/
              backgroundColor: "#FFF8DC",
            },
          },
        },
    
        MuiToolbar: {
          styleOverrides: {
            root: {
              padding: "0px 0px !important",
            },
          },
        },
    
        MuiButton: {
          styleOverrides: {
            root: {
              height: "48px",
              minWidth: "125px",
              padding: "12px 32px !important",
              textTransform: "none",
              fontFamily: "Helvetica Now Text",
              fontSize:'16px',
             
              '&:hover': {
                backgroundColor: '#DCDCDC',
                color: '#000'
            }
            },

            textPrimary:{
              backgroundColor:'#483D8B',
              color:'#ffffff'
            },
             textSecondary:{
              backgroundColor:'#792F17',
              color:'#ffffff'
             },
             textInfo:{
              backgroundColor:'#Cf5f5f',
              color:'#ffffff'
             },
             textWarning:{
              backgroundColor:'#737373',
              color:'#ffffff'
             },




             contained: {
              color: '#fff',
            },
      
            containedPrimary: {
              color: '#fff',
            },
      
            containedSecondary: {
              color: '#fff',
            },
      
      
            colorInherit: {
              color: '#1123fd',
            },


          },
        },

       
        MuiOutlinedInput:{
          styleOverrides:{
            input:{
              padding:'4px 2px 4px 2px',
            }
          }
        },
       
       
      },


    });

export default budgtManTheme;

