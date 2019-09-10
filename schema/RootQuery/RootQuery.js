import {GraphQLObjectType} from "graphql"
import profile from "./User/profile";
import { teamMembers, teamMember } from "./TeamMembers"
const userQuery = {
    profile
};

const teamMemberQuery = {
    teamMembers,
    teamMember
};

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...userQuery,
        ...teamMemberQuery
    })
});

export default RootQuery
