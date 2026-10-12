import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    operatorId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    plainPassword: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'VOLUNTEER',
      enum: ['VOLUNTEER'],
    },
    clearance: {
      type: String,
      default: 'SECTOR-VOLUNTEER',
    },
    sector: {
      type: String,
      default: 'FLOOR OPS',
      trim: true,
    },
    createdBy: {
      type: String,
      default: 'ADMIN-NEXUS',
    },
  },
  {
    timestamps: true,
    collection: 'volunteers',
  }
);

export const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;
