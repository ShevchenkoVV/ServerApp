import { usersCollection, getObjectID } from '../database/dbSetupScript';

const prepare = (object: any) => {
    object._id = object._id.toString();
    return object
};

// GraphQL: Resolvers
const RESOLVERS = {
    Query: {
        person: async (root: any, _id: any) => {
            return prepare(await usersCollection.findOne(getObjectID(_id)));
        },
        persons: async () => {
            return (await usersCollection.find({}).toArray()).map(prepare);
        }
    },
    Mutation: {
        createPerson: async (root: any, args: any, context: any, info: any) => {
            const res = await usersCollection.insert(args);
            return prepare(await usersCollection.findOne({_id: res.insertedIds[1]}));
        },
    },
};
// Exports
export default RESOLVERS;
