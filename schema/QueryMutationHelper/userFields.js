import {GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";
const userFields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    token: {type: GraphQLString},
};

export default userFields
