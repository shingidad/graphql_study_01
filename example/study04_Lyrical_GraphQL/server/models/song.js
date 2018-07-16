import mongoose, { Schema } from 'mongoose';

const COL_NAME = 'song';

const SongSchema = new Schema({
    title: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'lyric'
    }]
});


SongSchema.statics.addLyric = function (id, content) {
    const Lyric = mongoose.model('lyric');
    return this.findById(id).then(song => {
        const lyric = new Lyric({ content, song })
        song.lyrics.push(lyric)
        return Promise.all([
            lyric.save(),
            song.save()])
            .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function (id) {
    return this.findById(id).populate('lyrics')
        .then(song => song.lyrics);
}

export default mongoose.model(COL_NAME, SongSchema, COL_NAME);