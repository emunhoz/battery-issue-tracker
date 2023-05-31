import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { startStandaloneServer } from '@apollo/server/standalone'
import { IdentifyBatteryIssuesResolver } from '../resolvers'

export async function setupApolloServer() {
  const schema = await buildSchema({
    resolvers: [IdentifyBatteryIssuesResolver],
  })

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}
