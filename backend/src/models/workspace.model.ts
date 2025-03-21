import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";
import { generateInviteCode } from "../utils/uuid";

export interface WorkSpaceDocument extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
  createAt: string;
  updateAt: string;
}

const WorkSpaceSchema = new Schema<WorkSpaceDocument>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: false },
  owner: {type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  }, 
  inviteCode: {
     type: String, 
     required: true,
     unique: true,
     default: generateInviteCode,
  }
}, {
    timestamps: true,
});

WorkSpaceSchema.methods.resetInviteCode = function() {
    this.inviteCode = generateInviteCode();
};

const WorkSpaceModel = mongoose.model<WorkSpaceDocument>(
    "Workspace", WorkSpaceSchema
);

export default WorkSpaceModel;
