import {GraphQLObjectType, GraphQLString, GraphQLError, GraphQLNonNull} from "graphql";
import User from "../../../models/User"
import fields from "../../QueryMutationHelper/userFields";
import {hashedPasswordGenerator, userReturn} from "../../QueryMutationHelper/userHelper";

const signUp = {
    type: new GraphQLObjectType({
        name: "signIn",
        fields
    }),
    args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: async (parentValue, {name, email, password}) => {
        const hashedPassword = await hashedPasswordGenerator(password);
        return User.findOne({email})
            .then(res => {
                if (res === null) {
                    const newUser = new User({name, email, password: hashedPassword});
                    return newUser
                        .save()
                        .then(({_doc}) => userReturn(_doc))
                        .catch(er => {
                            return new GraphQLError({
                                    errorCode: 500,
                                    message: `Timeout`,
                                    error: er
                                }
                            )
                        });
                } else {
                    const doc = res._doc;
                    return userReturn(doc);
                }
            })
            .catch(er => {
                return new GraphQLError({
                        errorCode: 500,
                        message: `Timeout`,
                        error: er
                    }
                )
            })
    }
};

export default signUp
