import {GraphQLID, GraphQLString} from "graphql";
const eventFields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    date: {type: GraphQLString},
    createdBy: {type: GraphQLString},
    description: {type: GraphQLString},
    registrationForm: {type: GraphQLString},
};

export default eventFields
