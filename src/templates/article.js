import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SEO from "../components/seo";
import Quiz from "../components/layout-quiz";
const shortcodes = { Quiz }

export default function Article({ data }) {
  const post = data.strapiArticleContents
  
  //console.log(JSON.stringify(post, null, 4))
  return (
    <Layout>
      <SEO title={post.Title} />
      <div>
          <div style={{ 
                display: "inline-flex",
                verticalAlign: "bottom",
                lineHeight: "inherit",
                paddingTop: 2,
            }}>
            <Link
              to="/"
              style={{ color: 'inherit', textDecoration: `none`, }}>
            <h6 style={{fontSize: 16 }}>Main</h6>
            </Link>
            <ArrowForwardIosIcon style={{ fontSize: "inherit", }} />
            <Link
              to={"/"+post.categories[0].Name}
              style={{ color: 'inherit', textDecoration: `none`, }}
            >
              <h6 style={{fontSize: 16 }}>{post.categories[0].Name}</h6>
            </Link>
            <ArrowForwardIosIcon style={{ fontSize: "inherit", }} />
          </div>
        <h1>{post.Title}</h1>
        <MDXProvider components={shortcodes}><MDXRenderer>{post.childMdx.body}</MDXRenderer></MDXProvider>

      </div>
    </Layout>
  )
}
export const query = graphql`
  query($title: String!) {
    strapiArticleContents(Title: {eq: $title}) {
      childMdx {
        body
      }
      Content
      Title
      strapiId
      categories {
        Name
      }
      updated_at
    }
  }
`