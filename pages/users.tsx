import { gql, useQuery } from '@apollo/client'
import * as React from 'react'
import { UserDto } from '../dtos/UserDto'

const UsersPage = () => {
  const { data, loading, error } = useQuery(gql`
    query {
      users {
        id
        email
        isEmailVerified
      }
    }
  `)

  return loading ? (
    <div>loading</div>
  ) : error ? (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  ) : (
    <div>
      {data?.users.map((u: UserDto) => (
        <div key={u.id}>
          {u.id} {u.email}
        </div>
      ))}
    </div>
  )
}

export default UsersPage
