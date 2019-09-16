import {GraphQLError, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/eventFields";
import {JWTVerify} from "../../QueryMutationHelper/userHelper";
import Event from "../../../models/Event";

const addEVent = {
    type: new GraphQLObjectType({
        name: "addEvent",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        // TODO: make token non null
        name: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        registrationForm: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (parentValue, {token, name, date, description, registrationForm}) => {
        const {_id: createdBy, role} = JWTVerify(token);
        if (role === "team-member") {
            // event name must be unique
            return Event.findOne({name})
                .then(res => {
                    if (!res) {
                        const newEvent = new Event({name, date, description, registrationForm, createdBy})
                        return newEvent.save()
                            .then(res => res)
                            .catch(er => er)
                    } else {
                        return new GraphQLError({
                            errorCode: 400,
                            message: `Event ${name} already exists, event name must be unique`
                        })
                    }
                })
                .catch(er => new GraphQLError({
                    errorCode: 400,
                    message: "Event failed, retry again" + er
                }))
        } else {
            return new GraphQLError({
                errorCode: 401,
                message: "You are not a team member, hence can't add event"
            })
        }
    }
};

export default addEVent
