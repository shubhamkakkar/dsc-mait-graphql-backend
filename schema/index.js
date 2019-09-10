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
 TODO
* validation mongoose
* edit add delete only team token type limitation
* add non null to graphql args
* upload images of team
* add designation in team member and hence in user schema
*/

export default schema;
