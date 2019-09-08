import {GraphQLObjectType} from "graphql"
import profile from "./User/profile";

const userQuery = {
    profile
};

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...userQuery
    })
});

export default RootQuery
