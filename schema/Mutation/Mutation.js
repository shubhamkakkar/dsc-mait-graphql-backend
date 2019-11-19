import {
    GraphQLObjectType
} from "graphql";

import userMutations from "./User"
import teamMemberMutations from "./TeamMember";
import eventMutation from "./Event"
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...teamMemberMutations,
        ...eventMutation
    }
});

export default mutation
