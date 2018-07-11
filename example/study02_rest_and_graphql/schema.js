const graphql = require('graphql');
const _ = require('lodash');
const db = require('./dumpDB');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User Type',
    fields: {
        id: { type: GraphQLString },
        firstName: {
            type: GraphQLString,
            description: 'user first name'
        },
        age: {
            type: GraphQLInt,
            description: 'user age'
        },
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(db, user => (user.id === args.id));
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});