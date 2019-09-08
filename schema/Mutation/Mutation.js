import {
    GraphQLObjectType
} from "graphql";

import {signUp, logIn} from "./User"

const userMutations = {
    signUp,
    logIn
};

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutations
    }
});

export default mutation
