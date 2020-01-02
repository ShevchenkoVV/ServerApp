// Imports: Axios
import axios from 'axios';
// GraphQL: Resolvers
const RESOLVERS = {
    Query: {
        // test_query: (root: any, args: any, context: any) => {
        //     return axios.get(`www.apiurl.com/people`)
        //         .then((response) => response.data)
        //         .catch((error) => console.log(error))
        // },
        test_query: (root: any, args: any, context: any) => {
            return Promise.resolve({data: {test_field_1: '1', test_field_2: 2, test_field_3: true}})
                .then((response) => response.data)
                .catch((error) => console.log(error))
        }
    }
};
// Exports
export default RESOLVERS;
