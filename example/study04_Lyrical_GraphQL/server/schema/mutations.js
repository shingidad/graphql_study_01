import mongoose from 'mongoose';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from 'graphql';
import { Song, Lyric } from '../models';
import SongType from './songType';
import LyricType from './lyricType';

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSong: {
            type: SongType,
            args: {
                title: { type: GraphQLString }
            },
            resolve(parentValue, { title }) {
                return (new Song({ title })).save()
            }
        },
        addLyricToSong: {
            type: SongType,
            args: {
                content: { type: GraphQLString },
                songId: { type: GraphQLID }
            },
            resolve(parentValue, { content, songId }) {
                return Song.addLyric(songId, content);
            }
        },
        likeLyric: {
            type: LyricType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Lyric.like(id);
            }
        },
        deleteSong: {
            type: SongType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Song.remove({ _id: id });
            }
        }
    }
});

export default mutation;