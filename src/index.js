const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const playground = require('./graphql/playgroundTabsConfig');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: args => args,
  playground
});

server.listen()
.then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
