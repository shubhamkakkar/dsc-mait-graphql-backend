import {GraphQLObjectType} from "graphql"
import teamMemberQuery from "./TeamMembers";
import userQuery from "./User";
import eventQuery from "./Event";



const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...userQuery,
        ...teamMemberQuery,
        ...eventQuery
    })
});

export default RootQuery
