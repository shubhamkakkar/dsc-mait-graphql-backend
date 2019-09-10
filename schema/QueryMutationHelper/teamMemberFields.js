import {GraphQLID, GraphQLString} from "graphql";
const teamMemberFields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    linkedin: {type: GraphQLString},
    github: {type: GraphQLString},
    bio: {type: GraphQLString},
};

export default teamMemberFields
