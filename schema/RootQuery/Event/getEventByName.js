import {GraphQLError, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/eventFields";
import Event from "../../../models/Event";

const getEventByName = {
    type: new GraphQLObjectType({
        name: "getEventByName",
        fields
    }),
    args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (parentValue, {name}) => Event.findOne({name})
        .then(res => {
            if (!res) {
                return new GraphQLError({
                    errorCode: 404,
                    message: `Event ${name} doesn't exists`
                })
            } else {
                return res
            }
        })
        .catch(er => er)
};

export default getEventByName
