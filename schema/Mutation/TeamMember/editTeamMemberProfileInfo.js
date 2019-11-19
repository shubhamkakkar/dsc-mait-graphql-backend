import { GraphQLError, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import TeamMember from "../../../models/TeamMember";


const editTeamMemberProfileInfo = {
    type: new GraphQLObjectType({
        name: "AddTeamMember",
        fields
    }),
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) },
        linkedin: { type: new GraphQLNonNull(GraphQLString) },
        github: { type: GraphQLString },
    },
    resolve: (parentValue, { email, linkedin, github, bio }) => {
        return TeamMember.findOne({ email })
            .then(user => {
                if (user !== null) {
                    let update = {
                        bio,
                        linkedin,
                    };
                    if (github) {
                        update = { ...update, github }
                    }
                    return TeamMember.findOneAndUpdate({ userId: user._id }, update, { new: true }).then(res => res).catch(er => new GraphQLError({
                        errorCode: 500,
                        message: `Timeout, failed to update`,
                        error: er
                    }))
                } else {
                    const newTeamMember = new TeamMember({ email, linkedin, bio, github, role })
                    // return newTeamMember
                    //     .save()
                    //     .then(res => console.log(res))
                    //     .catch(er => {
                    //         return new GraphQLError({
                    //             errorCode: 500,
                    //             message: `Timeout`,
                    //             error: er
                    //         }
                    //         )
                    //     });
                }
            })
            .catch(error => new GraphQLError({
                errorCode: 500,
                message: `Timeout`,
                error
            })
            )
    }
};
export default editTeamMemberProfileInfo
