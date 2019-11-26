const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers').resolvers;

/*
  Issues to overcome when using this with ago api:
    - search, sort, pagination...
    - num has max of 100
    - token
    - no node in enterprise!!!
    - [use arcgis-rest-js]
*/

const server = new GraphQLServer({
  typeDefs: `./src/graphql/schema.graphql`,
  resolvers,
})

const opts = {
  defaultPlaygroundQuery: `
query surveys {
  surveys(type:"published" groups:["2f4d28abfdea4ffab5ec4c5c54574ef8", "95c6c8202a0e4f189ca0aad12a10d501"]) {
    id
    title
    description
    typeKeywords
  }
}

query survey {
  survey(id:"3ce0ef773c3445e29bc881503f366047") {
    id
    title
  }
}
`,
};

server.start(opts, _ => console.log(`Server is running on http://localhost:4000`))
