import {GraphQLError, GraphQLObjectType, GraphQLString, GraphQLNonNull} from "graphql";
import fields from "../../QueryMutationHelper/userFields";
import User from "../../../models/User";

const   editForRole = {
    type: new GraphQLObjectType({
        name: "editForRole",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        email: {type: new GraphQLNonNull(GraphQLString)},
        role: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (parentValue, {email,role}) => {
        return User.findOne({email})
            .then(user => {
                if (user) {
                    const update = {
                        role,
                    };

                    return User.findByIdAndUpdate(update._id, {
                        $set: update
                    })
                        .then(_ => ({...update, ...user._doc}))
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
