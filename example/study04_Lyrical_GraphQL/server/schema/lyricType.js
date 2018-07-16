import mongoose, { Schema } from 'mongoose';
import { Lyric } from '../models';
import SonyType from './songType';
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
} from 'graphql';

const LyricType = new GraphQLObjectType({
    name: 'LyricType',
    fields: () => ({
        id: { type: GraphQLID },
        likes: { type: GraphQLInt },
        content: { type: GraphQLString },
        song: {
            type: SonyType,
            resolve(parentValue) {
                return Lyric.findById(parentValue).populate('song')
                    .then(lyric => {
                        return lyric.song
                    });
            }
        }
    })
});

export default LyricType;