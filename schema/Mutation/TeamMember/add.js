import {GraphQLError, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";

import TeamMember from "../../../models/TeamMember"

const addTeamMember = {
    type: new GraphQLObjectType({
        name: "addTeamMember",
        fields
    }),
    args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        linkedin: {type: GraphQLString},
        github: {type: GraphQLString},
        bio: {type: GraphQLString},
        //   TODO: add createdBy to ensure deletion/edit validation
    },
    resolve: (parentValue, {name, email, linkedin, github, bio}) => {
        return TeamMember.findOne({email})
            .then(res => {
                if (!res) {
                    const newTeamMember = new TeamMember({name, email, linkedin, github, bio});
                    return newTeamMember
                        .save()
                        .then(res => {
                            console.log({res})
                            return res
                        })
                        .catch(error => new GraphQLError({
                                errorCode: 500,
                                message: `Timeout`,
                                error
                            })
                        );
                } else {
                    return new GraphQLError({
                            errorCode: 400,
                            message: `Team member with email: ${email} already exists`
                        }
                    )
                }
            })
            .catch(error => new GraphQLError({
                errorCode: 500,
                message: `Timeout`,
                error
            }))
    }
};

export default addTeamMember
