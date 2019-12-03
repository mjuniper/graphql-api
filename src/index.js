const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers');
const defaultPlaygroundQuery = require('./graphql/defaultPlaygroundQuery');
const fs = require('fs');

const server = new GraphQLServer({
  typeDefs: `./src/graphql/schema.graphql`,
  resolvers,
  context: args => args
})

const opts = {
  defaultPlaygroundQuery,
  // https: {
  //   key: fs.readFileSync('ssl/server.key'),
  //   cert: fs.readFileSync('ssl/server.cert')
  // }
};

server.start(opts, _ => console.log(`Server is running on http://localhost:4000`))
