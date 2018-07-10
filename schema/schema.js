const graphql = require('graphql');
const _ = require('lodash');
const users = require('../dumpDB');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '유저 데이터',
    fields: {
        id: { type: GraphQLString },
        firstName: {
            type: GraphQLString,
            description: '성'
        },
        age: {
            type: GraphQLInt,
            description: '나이'
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: '유저 데이터 찾는 Root',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});