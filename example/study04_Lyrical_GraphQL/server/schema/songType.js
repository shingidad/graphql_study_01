import mongoose from 'mongoose';
import LyricType from './lyricType';
import { Song } from '../models';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} from 'graphql';

const SongType = new GraphQLObjectType({
    name: 'SongType',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        lyrics: {
            type: new GraphQLList(LyricType),
            resolve(parentValue) {
                return Song.findLyrics(parentValue.id);
            }
        }
    })
});

export default SongType;
