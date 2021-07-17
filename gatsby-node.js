const path = require(`path`)
const crypto = require(`crypto`);


exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const { createNode } = actions
  if (node.internal.type === "StrapiArticles") {
      createNode({
        ...node,
        id: createNodeId(`StrapiArticleContents-${node.id}`),
        parent: node.id,
        children: [],
        internal: {
            content: node.Content || " ",
            type: "StrapiArticleContents",
            mediaType: "text/markdown",
            contentDigest: crypto
                .createHash("md5")
                .update(node.Content || " ")
                .digest("hex"),
        },  
      });
  }
  if (node.internal.type === "StrapiHome") {
    createNode({
      ...node,
      id: createNodeId(`StrapiHomeContents-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
          content: node.Content || " ",
          type: "StrapiHomeContents",
          mediaType: "text/markdown",
          contentDigest: crypto
              .createHash("md5")
              .update(node.Content || " ")
              .digest("hex"),
      },  
    });
  }
  if (node.internal.type === "StrapiHelp") {
    createNode({
      ...node,
      id: createNodeId(`StrapiHelpContents-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
          content: node.Content || " ",
          type: "StrapiHelpContents",
          mediaType: "text/markdown",
          contentDigest: crypto
              .createHash("md5")
              .update(node.Content || " ")
              .digest("hex"),
      },  
    });
  }
};


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
  query {
    allStrapiArticles {
      edges {
        node {
          Title
          strapiId
          categories {
            Name
          }
        }
      }
    }
  }  
  `)


  //console.log(JSON.stringify(result, null, 4))
  result.data.allStrapiArticles.edges.forEach(({ node }) => {
  createPage({
    path: '/'+node.categories[0].Name+'/'+node.Title,
    component: path.resolve(`./src/templates/article.js`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      title: node.Title,
    },
  })
  })

  const cat = [...new Set(result.data.allStrapiArticles.edges.map(cat => cat.node.categories[0].Name))]
  //console.log(JSON.stringify(cat, null, 4))
  cat.forEach((category) => {
  createPage({
    path: category,
    component: path.resolve(`./src/templates/category.js`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      category: category,
    },
  })
  })
}