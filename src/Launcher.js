import { config } from 'dotenv';
import { Lukita } from './Client.js';

config({ path: '../.env' });

new Lukita().start();