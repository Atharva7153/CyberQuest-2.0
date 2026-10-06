import mongoose from 'mongoose';
import { CREDIT_TRANSACTION_TYPES } from '../config/creditsConfig.js';

const creditTransactionSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(CREDIT_TRANSACTION_TYPES),
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    relatedChallenge: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    relatedAbility: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: 'teamEvents',
  }
);

export const CreditTransaction = mongoose.model('CreditTransaction', creditTransactionSchema);
export default CreditTransaction;
