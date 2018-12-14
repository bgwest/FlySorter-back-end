'use strict';

const mongoose = require('mongoose');
const Part = require('./part');

const subAssemblySchema = mongoose.Schema({
  subId: {
    type: String,
    unique: true,
    required: true,
  },
  subPart: {
    type: String,
    required: true,
  },
  subVersion: {
    type: String,
  },
  subQuantity: {
    type: String,
  },
  subMinutes: {
    type: String,
  },
  // TOM: This connects the subAssembly to the Parts
  partIDRef: {
    type: String,
  },
  parts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'part',
    },
  ],
},
{
  usePushEach: true,
});

function subAssemblyPreHook(done) {
  return Part.findById(this.part)
    .then((partFound) => {
      if (!partFound) {
        return true;
      }
      partFound.subAssemblies.push(this._id);
      return partFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}

subAssemblySchema.pre('save', subAssemblyPreHook);
const SubAssembly = module.exports = mongoose.model('subAssembly', subAssemblySchema);

SubAssembly.create = (subId, subPart, subVersion, subQuantity, subMinutes) => {
  return new SubAssembly({
    subId,
    subPart,
    subVersion,
    subQuantity,
    subMinutes,
  }).save();
};
