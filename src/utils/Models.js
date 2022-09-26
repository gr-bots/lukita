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
  bl: { type: Boolean, default: false , motivo: { type: String, default: 'Motivo não apresentado' }  },
  perfil: {
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    waffles: { type: Number, default: 0 },
    caixinhas: { type: Number, default: 0 },
    sobremim: { type: String, default: 'Não definido' },
    reps: { type: Number, default: 0 },
    casamento: { type: Boolean, default: 'Não casado', user: { type: String, default: null } },
  },
}));

export { Guild, User, connect };
