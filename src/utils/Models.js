import pkg from 'mongoose';

const { connect, set, model, Schema } = pkg;

const Guild = model('Guild', new Schema({
  _id: { type: String, default: null },
  bl: { type: Boolean, default: false , motivo: { type: String, default: 'Motivo não apresentado' }  },
  actives: {
    forms: { type: Array, default: "undefined" },
    logs: { type: Array, default: "undefined" },
    autorole: { type: Object, default: "undefined" },
    modlogs: { type: Array, default: "undefined" },
    welcome: { type: Object, default: "undefined" },
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
    casamento: { type: Boolean, default: false , user: { type: String, default: "undefined" } },
  },
}));

export { Guild, User, connect };
