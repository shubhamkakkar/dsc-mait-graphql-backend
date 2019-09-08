import {GraphQLError, GraphQLObjectType, GraphQLString} from "graphql";
import bcrypt from "bcrypt";
import fields from "../../QueryMutationHelper/userFields";
import User from "../../../models/User"
import {userReturn} from "../../QueryMutationHelper/userHelper";

const login = {
    type: new GraphQLObjectType({
        name: "login",
        fields
    }),
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parentValue, {email, password}) => {
        return User.findOne({email})
            .then(res => {
                if (res !== null) {
                    const doc = res._doc;
                    const hashPasswordCompareBool = bcrypt.compareSync(password, doc.password)
                    if (hashPasswordCompareBool) {
                        return userReturn(doc);
                    } else {
                        return new GraphQLError({
                                errorCode: 404,
                                message: `password is wrong`,
                            }
                        )
                    }
                } else {
                    return new GraphQLError({
                            errorCode: 400,
                            message: `User with email: ${email} doesn't exist`
                        }
                    )
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


export default login
