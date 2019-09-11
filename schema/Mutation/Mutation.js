import {
    GraphQLObjectType
} from "graphql";

import userMutations from "./User"
import teamMemberMutations from "./TeamMember";
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutations,
        ...teamMemberMutations
    }
});

export default mutation
