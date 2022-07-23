import pkg from 'mongoose';
const { connect, model, Schema } = pkg;

const Guild = model('Guild', new Schema({
  _id: { type: String, default: null },
  actives: {
    forms: { type: Array, default: null },
    logs: { type: Array, default: null },
    modlogs: { type: Array, default: null },
    welcome: { type: Array, default: null }
  }
}))

const User = model('User', new Schema({
  _id: { type: String, default: null }
}))

export { Guild, User, connect }