import 'reflect-metadata'
import { setupApolloServer } from './main/graphql/apollo/apollo-server'

async function main() {
  await setupApolloServer()
}

main()
