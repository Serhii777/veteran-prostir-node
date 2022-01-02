module.exports.prepareUseradminResponse = (users) => {
  return users.map((user) => {
    const { name, email, _id } = user;

    return { id: _id, name, email };
  });
};
