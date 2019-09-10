import {
    GraphQLSchema,
} from "graphql";

import RootQuery from "./RootQuery/RootQuery"
import mutation from "./Mutation/Mutation"

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});

/*
* TODO
* validation mongoose
* edit add delete only team token type limitation
* */

export default schema;
