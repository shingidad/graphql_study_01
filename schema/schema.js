const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = graphql;


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    description: '회사 타입(모델)',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, arg) {
                return axios
                    .get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data);
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    description: '유저 타입(모델)',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: {
            type: GraphQLString,
            description: '성'
        },
        age: {
            type: GraphQLInt,
            description: '나이'
        },
        company: {
            type: CompanyType,
            description: '회사 데이터',
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});