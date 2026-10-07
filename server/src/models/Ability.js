import mongoose from 'mongoose';

const abilitySchema = new mongoose.Schema(
  {
    abilityId: {
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
    code: {
      type: String,
      default: 'MOD-00',
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
      default: 100,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    effectType: {
      type: String,
      required: true,
      default: 'CONFIGURABLE_MODULE',
      trim: true,
    },
    effectConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

abilitySchema.methods.toPublicJSON = function () {
  return {
    abilityId: this.abilityId,
    name: this.name,
    code: this.code,
    description: this.description,
    cost: this.cost,
    enabled: this.enabled,
    effectType: this.effectType,
    effectConfig: this.effectConfig || {},
  };
};

export const Ability =
  mongoose.models.Ability || mongoose.model('Ability', abilitySchema);

export default Ability;
