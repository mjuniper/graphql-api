const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    surveys(type: String, groups: [String], q: String): [Survey!]!
    survey(id: ID!): Survey
  }

  type Survey {
    id: ID!
    title: String!
    description: String
    type: String
    typeKeywords: [String]
    formInfo: FormInfo
  }

  type FormInfo {
    status: String
    schedule: SurveySchedule
  }

  type SurveySchedule {
    start: String
    end: String
  }
`;
