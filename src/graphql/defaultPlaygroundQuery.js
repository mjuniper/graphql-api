module.exports = `# https://github.com/mjuniper/graphql-api

# to make authenticated requests, paste this into the http headers below:
# {"authorization":"your-token"}

# ##########################################################
# below are sample queries we can make to the graphql-api
# the api will proxy those requests to the ago api making
# only the requests necessary to fullfill the request
# ##########################################################

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
`
