import { config } from 'dotenv';
import { Lukita } from './Client.js';

config();

new Lukita().start();
