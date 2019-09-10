import {GraphQLError, GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import TeamMember from '../../../models/TeamMember'

const editTeamMember = {
    type: new GraphQLObjectType({
        name: "editTeamMember",
        fields
    }),
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        linkedin: {type: GraphQLString},
        github: {type: GraphQLString},
        bio: {type: GraphQLString},
        //   TODO: check on createdBy to ensure edit validation ->  refer: Blog code
    },
    resolve: (parentValue, args) => {
        return TeamMember
            .findById(args.id)
            .then(teamMember => {
                if (teamMember) {
                    const {
                        name,
                        email,
                        linkedin,
                        github,
                        bio
                    } = teamMember

                    const update = {
                        name: args.name || name,
                        email: args.email || email,
                        linkedin: args.linkedin || linkedin,
                        github: args.github || github,
                        bio: args.bio || bio,
                    };

                    return TeamMember
                        .findByIdAndUpdate(args.id, {
                            $set: update
                        })
                        .then(res => {
                            return {
                                ...update,
                                _id: args.id
                                // TODO: createdBy
                            }
                        })
                        .catch(er => new GraphQLError({
                            errorCode: 500,
                            errorMessage: "Time Out,failed to update"
                        }))

                } else {
                    console.log("null")
                }
            })
            .catch(er => new GraphQLError({
                errorCode: 500,
                errorMessage: "Time Out"
            }))
    }
};

export default editTeamMember
