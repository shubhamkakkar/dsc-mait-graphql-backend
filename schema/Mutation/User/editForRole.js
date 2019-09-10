import {GraphQLError, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import User from "../../../models/User";


const editForRole = {
    type: new GraphQLObjectType({
        name: "editForRole",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        email: {type: GraphQLString},
        role: {type: GraphQLString},
        name: {type: GraphQLString},
        linkedin: {type: GraphQLString},
        github: {type: GraphQLString},
        bio: {type: GraphQLString}
    },
    resolve: (parentValue, {email, ...rest}) => {
        return User.findOne({email})
            .then(user => {
                if (user) {
                    console.log({user, email});
                    const update = {
                        ...user._doc, ...rest
                    };
                    return User.findByIdAndUpdate(update._id, {
                        $set: update
                    })
                        .then(_ => update)
                        .catch(error => new GraphQLError({
                                errorCode: 500,
                                message: `Timeout, update failed`,
                                error
                            })
                        )
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
export default editForRole
