import {
    GraphQLObjectType
} from "graphql";

import {signUp, logIn} from "./User"
import {add, deleteTeamMember, editTeamMember} from "./TeamMember"
const userMutations = {
    signUp,
    logIn,

};

const teamMemberMutations = {
    addTeamMember: add,
    deleteTeamMember,
    editTeamMember
};

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutations,
        ...teamMemberMutations
    }
});

export default mutation
