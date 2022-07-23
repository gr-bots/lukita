import pkg from 'mongoose';
const { connect, model, Schema } = pkg;

const Guild = model('Guild', new Schema({
  _id: { type: String, default: null },
  actives: {
    forms: { default: null },
    logs: { default: null },
    modlogs: { default: null },
    welcome: { default: null }
  }
}))

const User = model('User', new Schema({
  _id: { type: String, default: null }
}))

export { Guild, User, connect }