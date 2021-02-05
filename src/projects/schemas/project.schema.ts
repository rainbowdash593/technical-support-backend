import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';

export const ProjectSchema = new mongoose.Schema({
  name: String,
  token: String,
  panelUrl: String,
  createdAt: String,
  updatedAt: String,
});

ProjectSchema.plugin(mongoose_delete, { deletedAt: true });
