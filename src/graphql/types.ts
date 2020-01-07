// Imports: GraphQL
import { gql } from 'apollo-server-express';
// GraphQL: TypeDefs
const TYPEDEFS = gql`
    type Query {
        person(_id: String): Person
        persons: [Person]
    }
    
    type Person {
        _id: String
        firstName: String
        secondName: String
        lastName: String
        address: String
    }

    type Mutation {
        createPerson(firstName: String, secondName: String, lastName: String, address: String): Person
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
// Exports
export default TYPEDEFS;
