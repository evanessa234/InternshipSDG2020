import ApolloClient, { gql } from "apollo-boost";

export const LOGIN = gql`
  query Login($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      jwt
      role
    }
  }
`;

export const GETUSER = gql`
  query {
    getUser {
      id
      email
      firstName
      lastName
      jwt
      role
    }
  }
`;

export const GETCOURSES = gql`
  query {
    courses {
      id
      from
      to
      sem
      subjectCode
      name
      credits
      lectHours
      toLectHours
      practHours
      toPractHours
      submitBy
      submitTime
      dqaApproved
      hodApproved
      hodComment
      hodCommentTime
      objectives {
        number
        name
      }
      outcomes {
        number
        name
        weightagePercent
        durationHours
        numberOfExp
      }
      topics {
        coMeet
        chapterExpTopic
        chapterExpNumber
        chapterExpWeightage
      }
      coPoMappings {
        coNumber
        poNumber
        rating
      }
      coPsoMappings {
        coNumber
        poNumber
        rating
      }
      lessonPlans {
        weekNumber
        lectureNumber
        subTopics
        coMeet
        weightage
        teachingMethod
      }
      programOutcomes {
        number
        title
        description
      }
      programSpecificOutcomes {
        number

        description
      }
      assessmentMethods {
        number
        method
        coMeet
        marks
      }
    }
  }
`;



export const GETCOURSE = gql`
  query Course($id: Int){
    course(id: $id) {

      from
      to
      sem
      subjectCode
      name
      credits
      lectHours
      toLectHours
      practHours
      toPractHours
      submitBy
      submitTime
      dqaApproved
      hodApproved
      hodComment
      hodCommentTime
      objectives {
        number
        name
      }
      outcomes {
        number
        name
        weightagePercent
        durationHours
        numberOfExp
      }
      topics {
        coMeet
        chapterExpTopic
        chapterExpNumber
        chapterExpWeightage
      }
      coPoMappings {
        coNumber
        poNumber
        rating
      }
      coPsoMappings {
        coNumber
        poNumber
        rating
      }
      lessonPlans {
        weekNumber
        lectureNumber
        subTopics
        coMeet
        weightage
        teachingMethod
      }
      programOutcomes {
        number
        title
        description
      }
      programSpecificOutcomes {
        number

        description
      }
      assessmentMethods {
        number
        method
        coMeet
        marks
      }
    }
  }
`;



export const CREATECOURSE = gql`
  mutation Course($data: CourseInput){
    createCourse(data: $data) {
      id
      from
      to
      sem
      subjectCode
      name
      credits
      lectHours
      toLectHours
      practHours
      toPractHours
      objectives {
        number
        name
      }
      outcomes {
        number
        name
        weightagePercent
        durationHours
        numberOfExp
      }
      topics {
        coMeet
        chapterExpTopic
        chapterExpNumber
        chapterExpWeightage
      }
      coPoMappings {
        coNumber
        poNumber
        rating
      }
      coPsoMappings {
        coNumber
        poNumber
        rating
      }
      lessonPlans {
        weekNumber
        lectureNumber
        subTopics
        coMeet
        weightage
        teachingMethod
      }
      programOutcomes {
        number
        title
        description
      }
      programSpecificOutcomes {
        number

        description
      }
      assessmentMethods {
        number
        method
        coMeet
        marks
      }
    }
  }
`;


export const UPDATECOURSE = gql`
  mutation Course($id: Int, $data: CourseInput){
    updateCourse(id: $id, data: $data) {
      id
      from
      to
      sem
      subjectCode
      name
      credits
      lectHours
      toLectHours
      practHours
      toPractHours
      objectives {
        number
        name
      }
      outcomes {
        number
        name
        weightagePercent
        durationHours
        numberOfExp
      }
      topics {
        coMeet
        chapterExpTopic
        chapterExpNumber
        chapterExpWeightage
      }
      coPoMappings {
        coNumber
        poNumber
        rating
      }
      coPsoMappings {
        coNumber
        poNumber
        rating
      }
      lessonPlans {
        weekNumber
        lectureNumber
        subTopics
        coMeet
        weightage
        teachingMethod
      }
      programOutcomes {
        number
        title
        description
      }
      programSpecificOutcomes {
        number

        description
      }
      assessmentMethods {
        number
        method
        coMeet
        marks
      }
    }
  }
`;

export const GETAUDIT = gql`
query GetAudit($id: Int){
  getAudit(id: $id){
    btLevel
    grammar
    coComment
    properDistributionMap
    commentMap
    syllabusCoverage
    coWeightage
    chapterExpWeightage
    commentWeightage
    coCoverageAssMethod
    marksDistribution
    questionQuality
    commentAssMethod
    typeOfExp
    timeJustified
    modernToolsUsed
    outOfSyllabus
  }
}
`;

export const CREATEAUDIT = gql`
mutation Audit($id: Int, $data: AuditInput){
  audit(id: $id data: $data) {
    btLevel
    grammar
    coComment
    properDistributionMap
    commentMap
    syllabusCoverage
    coWeightage
    chapterExpWeightage
    commentWeightage
    coCoverageAssMethod
    marksDistribution
    questionQuality
    commentAssMethod
    typeOfExp
    timeJustified
    modernToolsUsed
    outOfSyllabus
  }
}
`;


export const UPDATEAUDIT = gql`
mutation UpdateAudit($id: Int, $data: AuditInput){
  updateAudit(id: $id data: $data) {
    btLevel
    grammar
    coComment
    properDistributionMap
    commentMap
    syllabusCoverage
    coWeightage
    chapterExpWeightage
    commentWeightage
    coCoverageAssMethod
    marksDistribution
    questionQuality
    commentAssMethod
    typeOfExp
    timeJustified
    modernToolsUsed
    outOfSyllabus
  }
}
`;

export const SAVECOMMENT = gql `
mutation SaveComment($id: Int, $comment: String){
  hodComment(id: $id, comment: $comment){
    id
  }
}

`;

export const HODAPPROVE = gql `
mutation HodApprove($id: Int){
  hodApprove(id: $id){
    id
  }
}

`;


export const SUBMITCOURSE = gql `
mutation SubmitCourse($id: Int){
  submit(id: $id, sdrn: 1){
    id
    submitBy
  }
}

`;


export const DQAAPPROVE = gql `
mutation DqaApprove($id: Int){
  dqaApprove(id: $id){
    id
    dqaApproved
  }
}

`;