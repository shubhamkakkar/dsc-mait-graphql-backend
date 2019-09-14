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
        email:{type: new GraphQLNonNull(GraphQLString)},
        linkedin: {type: GraphQLString},
        github: {type: GraphQLString},
        bio: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (parentValue, {email, linkedin, github, bio}) => {
        return User.findOne({email, role: "team-member"})
            .then(user => {
                if (user) {
                    const update = {
                        linkedin, github, bio
                        // ADD 2 WAY RELATIONSHIP AS IN BLOGS - USER PROFILE GIVES ALL BLOGS
                        // SIMILARLY -> I WILL HAVE ONLY USER ID WHICH WILL GIVE ALL USER INFO, NO NEED TO STORE DOUBLE, USE USER ID/ EMAIL
                    }
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
