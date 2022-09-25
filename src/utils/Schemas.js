import pkg from 'mongoose';

const { connect, model, Schema } = pkg;

const Guild = model('Guild', new Schema({
  _id: { type: String, default: null },
  actives: {
    forms: { type: Array, default: null },
    logs: { type: Array, default: null },
    modlogs: { type: Array, default: null },
    welcome: { type: Array, default: null },
  },
}));
const User = model('User', new Schema({
  _id: { type: String, default: null },
}));

const user = await client.db.user.findOne({ _id: user.id });
if (!user) await client.db.user.create({ _id: user.id });

export default (client) = { Guild, User, connect };
