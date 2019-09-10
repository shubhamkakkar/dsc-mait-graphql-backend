import {GraphQLError, GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import TeamMember from '../../../models/TeamMember'

const deleteTeamMember = {
    type: new GraphQLObjectType({
        name: "deleteTeamMember",
        fields
    }),
    args: {
        id: {type: GraphQLString},
        token: {type: GraphQLString},
        //   TODO: check on createdBy to ensure deletion validation ->  refer: Blog code
    },
    resolve: (parentValue, {id}) => TeamMember.findByIdAndDelete(id).then(res => res).catch(er => er)
};

export default deleteTeamMember
