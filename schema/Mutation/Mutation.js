import {
    GraphQLObjectType
} from "graphql";

import userMutations from "./User"

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutations,}
});

export default mutation
