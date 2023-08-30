const { Notes, Users, Prefs } = require("../models");
const { Sequelize } = require("sequelize");

const getAllNotes = async (userId) => {
  return await Notes.findAll({
    where: {
      userId,
    },
  });
};

const getNote = async (param, userId) => {
  return await Notes.findOne({
    where: {
      id: param,
      userId,
    },
  });
};

const updateNote = async (title, body, category, id, sessionId) => {
  return await Notes.update(
    {
      title,
      body,
      category,
    },
    {
      where: {
        id,
        userId: sessionId,
      },
    }
  );
};

const deleteNote = async (param, userId) => {
  return await Notes.destroy({
    where: {
      id: param,
      userId,
    },
  });
};

module.exports = {
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
};
