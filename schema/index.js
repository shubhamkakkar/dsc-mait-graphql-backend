import {
    GraphQLSchema,
} from "graphql";

import RootQuery from "./RootQuery/RootQuery"
import mutation from "./Mutation/Mutation"

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});

export default schema;
