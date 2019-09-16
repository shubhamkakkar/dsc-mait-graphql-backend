import {GraphQLList, GraphQLObjectType} from "graphql";
import fields from "../../QueryMutationHelper/eventFields";
import Event from "../../../models/Event";

const eventObj = new GraphQLObjectType({
    name: "event",
    fields
});



const getAllEVents = {
    type: new GraphQLList(eventObj),
    args: {},
    resolve: (parentValue, args) => Event.find().then(res => res).catch(er => er)
};

export default getAllEVents
