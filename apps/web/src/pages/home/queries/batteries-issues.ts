import { gql } from '@apollo/client'

export const GET_BATTERIES_ISSUES = gql`
  query GetAcademyIdWithMostReplacements {
    getAcademyIdWithMostReplacements {
      academyId
      totalReplacements
      devices
    }
  }
`
