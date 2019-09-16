import {GraphQLError, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/eventFields";
import Event from "../../../models/Event";
import {JWTVerify} from "../../QueryMutationHelper/userHelper";
const deleteEvent = {
    type: new GraphQLObjectType({
        name: "deleteEvent",
        fields
    }),
    args: {
        token: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (parent, { token, name }) => {
        return Event.findOne({name})
            .then( event => {
                if(event){
                    const { _id } = event;
                    const {role} =  JWTVerify(token);
                    if(role === "team-member"){
                        return Event.findByIdAndDelete(_id)
                            .then(res => res)
                            .catch(er => er)

                    }else{
                        return new GraphQLError({
                            errorCode: 401,
                            message: "You are not a team member, hence can't delete event"
                        })
                    }
                }else {
                    return new GraphQLError({
                        errorCode: 404,
                        message: `Event ${name} doesn't exists`
                    })
                }
            })
    }
};

export default deleteEvent
