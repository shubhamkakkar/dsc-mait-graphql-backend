import {GraphQLObjectType, GraphQLString} from "graphql";
import fields from "../../QueryMutationHelper/teamMemberFields";
import User from "../../../models/TeamMember";


const editForRole = {
    type: new GraphQLObjectType({
        name: "editForRole",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        email: {type: GraphQLString},
        role: {type: GraphQLString}
    },
    resolve: (parentValue, {email, role}) => {
        User.findOne({email})
            .then(user => {
                console.log({user, email});
                const update = {
                    ...user._doc, role
                };
                console.log({update});
            })
            .catch(res => console.log({res}))
    }
};
export default editForRole
