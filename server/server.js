var express = require('express');
var graphqlHTTP = require('express-graphql');
const cors = require('cors')

// Schema
import { schema } from './schema.js'

//Resolver
import { root } from './connectors.js'

var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
