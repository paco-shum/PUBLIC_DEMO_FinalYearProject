/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Paper from '@material-ui/core/Paper';
import Header from "./header"
import Nav_help from "./nav_help"
import "./layout.css"
import { MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {customLightTheme, customDarkTheme} from '../components/theme'
import useSavedTheme from '../components/savedTheme'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [lightDark, setLightDark] = useSavedTheme();
  const handleLightDark = () => {
    window.localStorage.setItem('theme', !lightDark);
    setLightDark(!lightDark);
  };  


  return (
    <>
      <MuiThemeProvider theme={lightDark ? customLightTheme : customDarkTheme}>
        <CssBaseline />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} setLightDark={handleLightDark}/>
        <div>
          <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
          >
          <main style={{ paddingTop: "85px",
              }}>
            <Paper elevation={3} style={{ 
              //backgroundColor: "rgba(0, 0, 0, 0)",
              padding: "19px"
              }}>
              {children}
            </Paper>
          </main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © Paco Shum {new Date().getFullYear()}
          </footer>
        </div>
        </div>
        <Nav_help />
        </MuiThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
