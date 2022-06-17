// const { MongoDBNamespace } = require('mongodb');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('Contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('Contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const postContact = async (req, res, next) => {
  // req.body holds the recieved data. Access to that data is through req.body.keyName
  // this is how we fill the function with custom data every time 
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  console.log(contact);
  // insertOne() only takes one parameter since it only needs to know what to place
  const response = await mongodb.getDb().db().collection('Contacts').insertOne(contact);
  console.log(response);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }  
}

const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  // replaceOne() takes a filter, in this case we want the specific userId; and what to replace it with (contact)
  const response = await mongodb.getDb().db().collection('Contacts').replaceOne({ _id: userId }, contact);
console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Some error occurred while updating the contact.');
}
}

const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = { getAll, getSingle, postContact, updateContact, deleteContact};