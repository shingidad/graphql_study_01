import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import express from 'express';
import expressGraphQL from 'express-graphql';
import ejs from 'ejs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import webpack from 'webpack';
import webpackMiddelware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import schema from './schema';

config();

const { PUBLIC: publicPath } = process.env;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_PATH);
mongoose.connection
    .once('open', () => {
        console.log('connected mongodb');
    })
    .on('error', error => {
        console.log('error!');
    });

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({ schema, graphiql: true }));


const compiler = webpack(webpackConfig);
app.use(webpackMiddelware(compiler, {
    noInfo: false,
    publicPath,
    quiet: false,
    stats: 'minimal'
}));

app.get('/*', (req, res) => {
    ejs.renderFile(path.join(__dirname, 'views/index.ejs'), { publicPath, reqPath: req.path }).then(html => res.send(html))
});

export default app;
