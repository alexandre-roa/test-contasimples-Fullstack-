import { ObjectID } from 'mongodb';
export default {
<<<<<<< HEAD
  ObjectIDToId: (idToFormat: ObjectID) =>
    JSON.stringify(idToFormat).replace(/"/g, ''),
=======
  id: (idToFormat: ObjectID) => JSON.stringify(idToFormat).replace(/"/g, ''),
>>>>>>> ee8ed3c59a7e831d45b585f58c8b38bc0e934fb6
};
