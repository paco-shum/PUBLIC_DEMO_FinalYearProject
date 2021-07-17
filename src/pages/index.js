import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo";
import Quiz from "../components/layout-quiz";
const shortcodes = { Quiz }

export default function IndexPage({ data }) {
  const post = data.strapiHomeContents
  
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <MDXProvider components={shortcodes}><MDXRenderer>{post.childMdx.body}</MDXRenderer></MDXProvider>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    strapiHomeContents {
      childMdx {
        body
      }
      Content
      strapiId
      updated_at
    }
  }
`