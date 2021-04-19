import { Schema, model } from 'mongoose'

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 2 * 512 },
  usedSpace: { type: Number, default: 0 },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
})

export default model('User', User)
