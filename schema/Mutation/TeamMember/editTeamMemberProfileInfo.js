import {GraphQLError, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import User from "../../../models/User";
import TeamMember from "../../../models/TeamMember";


const editTeamMemberProfileInfo = {
    type: new GraphQLObjectType({
        name: "editTeamMemberProfileInfo",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        // TODO: make token non null
        email: {type: new GraphQLNonNull(GraphQLString)},
        bio: {type: new GraphQLNonNull(GraphQLString)},
        linkedin: {type: new GraphQLNonNull(GraphQLString)},
        github: {type: GraphQLString},
    },
    resolve: (parentValue, {email, linkedin, github, bio}) => {
        const filter = {email, role: "team-member"};
        return User.findOne(filter)
            .then(user => {
                if (user) {
                    let update = {
                        bio,
                        linkedin,
                        userId: user._id
                    };
                    if (github) {
                        update = {...update, github}
                    }
                   return TeamMember.findOneAndUpdate({ userId: user._id }, update, { new: true })
                        .then(async teamMemberFind => {
                            const userInfo = await User.findById(user._id).then(res => res);
                            if (teamMemberFind === null) {
                                const newTeamMember = new TeamMember({...update});
                                return newTeamMember.save()
                                    .then(res => ({
                                        ...res._doc,
                                        ...userInfo._doc
                                    }))
                                    .catch(res => res)
                            } else {
                                return {
                                    ...teamMemberFind._doc,
                                    ...userInfo._doc
                                }
                            }
                        })
                        .catch(res => console.log({res}))
                } else {
                    return new GraphQLError({
                            errorCode: 400,
                            message: `User with email: ${email} not found`,
                        }
                    )
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
