import { ObjectID } from 'mongodb';
export default {
  ObjectIDToId: (idToFormat: ObjectID) =>
    JSON.stringify(idToFormat).replace(/"/g, ''),
};
