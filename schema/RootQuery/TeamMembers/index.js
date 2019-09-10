import {GraphQLObjectType, GraphQLList, GraphQLString} from "graphql";
import TeamMember from "../../../models/TeamMember";
import fields from "../../QueryMutationHelper/teamMemberFields";

export const teamMember = {
    type: new GraphQLObjectType({
        name: "teamMember",
        fields
    }),
    args: {email: {type: GraphQLString}},
    resolve: (parentValue, {email}) => TeamMember.findOne({email})
};

const teamMemberObject = new GraphQLObjectType({
    name: "teamMembers",
    fields
});

export const teamMembers = {
    type: new GraphQLList(teamMemberObject),
    args: {},
    resolve: (parentValue, args) => TeamMember.find()
};
