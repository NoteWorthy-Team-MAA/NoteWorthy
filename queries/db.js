const { Notes, Users, Prefs } = require("../models");
const { Sequelize } = require("sequelize");

const getAllNotes = async (sort, userId) => {
  return await Notes.findAll({
    order: [['updatedAt', sort]],
    where: {
      userId,
    },
  });
};

const allCategories = async (userId) => {
  return await Notes.findAll({});
};

const getNote = async (param, userId) => {
  return await Notes.findOne({
    where: {
      id: param,
      userId,
    },
  });
};

const updateNote = async (title, category, body, id) => {
  return await Notes.update(
    {
      title,
      category,
      body,
    },
    {
      where: {
        id,
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
  allCategories,
};
