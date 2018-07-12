require('dotenv').config();
const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');

const { PORT, REST_ROUTE } = process.env;

const SERVER = `http://localhost:${PORT}${REST_ROUTE}`;

console.log(SERVER);

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
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
                    .get(`${SERVER}/companies/${parentValue.id}/users`)
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
                    .get(`${SERVER}/companies/${parentValue.companyId}`)
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
                    .get(`${SERVER}/users/${args.id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`${SERVER}/companies/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    // GraphQLNonNull은 절대 null 값이 들어오지 못하게 하는 기능이다.
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type:
                        new GraphQLNonNull(GraphQLInt),
                },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`${SERVER}/users`, { firstName, age })
                    .then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios.delete(`${SERVER}/users/${id}`)
                    .then(res => res.data);
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.patch(`${SERVER}/users/${args.id}`, args)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});