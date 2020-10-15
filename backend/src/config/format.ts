import { ObjectID } from 'mongodb';
export default {
  id: (idToFormat: ObjectID) => JSON.stringify(idToFormat).replace(/"/g, ''),
};
