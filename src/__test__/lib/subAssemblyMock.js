'use strict';

const faker = require('faker');
const SubAssembly = require('../../model/sub-assembly');
const partMock = require('./part-mock');

const subAssemblyMock = module.exports = {};

subAssemblyMock.pCreateSubAssemblyMock = () => {
  const resultMock = {};

  return partMock.pCreatePartMock()
    .then((createdPartMock) => {
      resultMock.part = createdPartMock;

      return new SubAssembly({
        subId: faker.lorem.words(1) + Math.random().toString(),
        subPart: faker.lorem.words(1),
        subVersion: faker.lorem.words(2),
        subQuantity: Math.random().toString(),
        subMinutes: Math.random().toString(),
        partIDRef: faker.lorem.words(1),
        parts: createdPartMock._id,
      }).save();
    })
    .then((createdSubAssemblyMock) => {
      resultMock.subAssembly = createdSubAssemblyMock;
      return resultMock;
    });
};

subAssemblyMock.pCleanSubAssemblyMocks = () => {
  return Promise.all([
    SubAssembly.remove({}),
    partMock.pCleanPartMocks(),
  ]);
};
