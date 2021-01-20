import React from 'react'
import { PhotoCard } from '../components/PhotoCard'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const query = gql`
  query getSinglePhoto($id: ID!) {
    photo(id: $id) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`

export const PhotoCardWithQuery = ({ id }) => (
  <Query query={query} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading...</h1>
      if (error) return <p>Error...</p>
      const { photo = {} } = data
      return <PhotoCard {...photo} />
    }}
  </Query>
)
