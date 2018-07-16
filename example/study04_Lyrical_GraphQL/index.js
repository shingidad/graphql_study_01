import { config } from 'dotenv';
import server from './server/server';

config();

const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`open http:localhsot:${PORT}`);
});