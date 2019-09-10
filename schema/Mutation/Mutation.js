import {
    GraphQLObjectType
} from "graphql";

import {signUp, logIn} from "./User"
import {add} from "./TeamMember"
const userMutations = {
    signUp,
    logIn
};

const teamMemberMutations = {
    addTeamMember: add
}

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutations,
        ...teamMemberMutations
    }
});

export default mutation
