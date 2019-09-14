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
* add event, update, delete event
* edit add delete only team token type limitation
* upload images of team
* add designation in team member and hence in user schema
* validation mongoose
* */

export default schema;
