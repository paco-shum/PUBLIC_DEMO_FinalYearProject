import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SEO from "../components/seo"
export default function Article({ data }) {
  const entries = data.allStrapiArticleContents
  const cat = entries.edges[0].node.categories[0].Name
  return (
    <Layout>
      <SEO title={cat} />
      <div>
      <div style={{ 
                display: "inline-flex",
                verticalAlign: "bottom",
                lineHeight: "inherit",
                paddingTop: 2,
            }}>
            <h6 style={{fontSize: 16 }}><Link
              to="/"
              style={{ color: 'inherit',textDecoration: `none`, }}
            >
            Main
            </Link></h6>
            <ArrowForwardIosIcon style={{ fontSize: "inherit", }} />
          </div>

        <h1>
          Catagory: {cat}
        </h1>
        <h4>{entries.totalCount} Article(s)</h4>
        <Divider style={{marginBottom: 15 }}/>
        {entries.edges.map(({ node }) => (
          <div key={node.strapiId}>
            <Link
              to={'/'+node.categories[0].Name+'/'+node.Title}
              style={{ color: 'inherit' }}
            >
            <h3 style={{
                color: 'inherit',
                textDecoration: `none`,
                marginBottom: 10
            }}>
              {node.Title}{" "}
            </h3>
            <p style={{
                color: 'inherit',
                textDecoration: `none`,
                fontSize:15
            }}>{node.childMdx.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($category: String!) {
    allStrapiArticleContents(sort: {fields: Title}, filter: {categories: {elemMatch: {Name: {eq: $category}}}}) {
      edges {
        node {
          Title
          childMdx {
            excerpt
          }
          strapiId
          categories {
            Name
          }
        }
      }
      totalCount
    }
  }
`
