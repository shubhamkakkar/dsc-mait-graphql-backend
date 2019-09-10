import {GraphQLObjectType, GraphQLList, GraphQLString} from "graphql";
import User from "../../../models/User";
import fields from "../../QueryMutationHelper/teamMemberFields";

export const teamMember = {
    type: new GraphQLObjectType({
        name: "teamMember",
        fields
    }),
    args: {email: {type: GraphQLString}},
    resolve: (parentValue, {email}) => User.findOne({email, role: "team-member"})
};

const teamMemberObject = new GraphQLObjectType({
    name: "teamMembers",
    fields
});

export const teamMembers = {
    type: new GraphQLList(teamMemberObject),
    args: {},
    resolve: (parentValue, args) => User.find({role: "team-member"})
};
