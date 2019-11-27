const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers').resolvers;

/*
  TODO:
    - deploy to surge
    - push upstream
    - use arcgis-rest-js
    - implement count info
*/

/*
  Issues to overcome when using this with ago api:
    - search, sort, pagination...
    - num has max of 100
    - token/authorization
    - no node in enterprise!!!
    - [use arcgis-rest-js]
    - avoid simply mirroring the ago api - this is an opportunity to make it better!
*/

const server = new GraphQLServer({
  typeDefs: `./src/graphql/schema.graphql`,
  resolvers,
  context: args => {
    return { ...args, jupe: 'jupe' };
  }
})

const opts = {
  defaultPlaygroundQuery: `

# to make authenticated requests, paste this into the http headers below:
# {"authorization":"your-token"}

fragment surveyFields on Survey {
  id
  title
  description
}

fragment surveyFieldsWithSchedule on Survey {
  id
  title
  formInfo {
    status
    schedule {
      start
      end
    }
  }
}

# this will make 1 request to ago (the search for the survey items)
query publishedSurveys {
  surveys(type:"published" groups:["2f4d28abfdea4ffab5ec4c5c54574ef8", "95c6c8202a0e4f189ca0aad12a10d501"]) {
    ...surveyFields
  }
}

# this will make 1 request to ago (the search for the survey items)
query draftSurveys {
  surveys(type:"draft" groups:["2f4d28abfdea4ffab5ec4c5c54574ef8", "95c6c8202a0e4f189ca0aad12a10d501"]) {
    ...surveyFields
  }
}

# this will make n + 1 requests to ago (one for the search and then one for the formInfo for each result)
query surveysWithSchedules {
  surveys(type:"published" groups:["2f4d28abfdea4ffab5ec4c5c54574ef8", "95c6c8202a0e4f189ca0aad12a10d501"]) {
    ...surveyFieldsWithSchedule
  }
}

# this will make 1 request to ago (for the specified survey item)
query survey {
  survey(id:"680f7cef6b634dfcaec6b68b5008edf6") {
    ...surveyFields
  }
}

# this will make 2 requests to ago (one for the specified item and one for its formInfo)
query surveyWithSchedule {
  survey(id:"680f7cef6b634dfcaec6b68b5008edf6") {
    ...surveyFieldsWithSchedule
  }
}
`,
};

server.start(opts, _ => console.log(`Server is running on http://localhost:4000`))
