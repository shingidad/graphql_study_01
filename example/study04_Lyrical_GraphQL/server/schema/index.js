import _ from 'lodash';
import { GraphQLSchema } from 'graphql';
import query from './rootQueryType';
import mutation from './mutations';

export default new GraphQLSchema({
    query,
    mutation,
});
