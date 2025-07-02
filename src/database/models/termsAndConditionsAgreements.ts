import mongoose, { Schema, Document } from "mongoose";

export interface ITermsAndConditionsAgreement extends Document {
    user: mongoose.Types.ObjectId;
    termsAndConditions: mongoose.Types.ObjectId;
    agreedAt: Date;
    isAgreed: boolean;
}

const termsAndConditionsAgreementSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    termsAndConditions: { type: Schema.Types.ObjectId, ref: 'TermsAndConditions', required: true },
    agreedAt: { type: Date, required: true },
    isAgreed: { type: Boolean, required: true }
}, { timestamps: true });

termsAndConditionsAgreementSchema.index({ user: 1, termsAndConditions: 1 }, { unique: true });

const TermsAndConditionsAgreement = mongoose.model<ITermsAndConditionsAgreement>("TermsAndConditionsAgreement", termsAndConditionsAgreementSchema);

export default TermsAndConditionsAgreement;