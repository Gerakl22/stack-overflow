const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }

  deleteAtPath(obj[path[index]], path, index + 1);
};

const convertMongoToJSON = (schema) => {
  let transform;

  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.options;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      if (transform) {
        return transform(doc, ret, options);
      }
    }
  });

};

module.exports = convertMongoToJSON;

