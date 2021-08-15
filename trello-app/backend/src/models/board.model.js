import Joi from 'joi';
import { getDB } from '@/config/mongodb';
import { ObjectId } from 'mongodb';
import { ColumnModel } from './column.model';
import { CardModel } from './card.model';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.bool().default(false)
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    return result.ops[0];
    //mongodb 4.0
    // return await getDB()
    //   .collection(boardCollectionName)
    //   .findOne(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        {
          $push: {
            columnOrder: columnId
          }
        },
        { returnOriginal: false }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    /**tt1 */
    // const result = await getDB()
    //   .collection(boardCollectionName)
    //   .aggregate([
    //     {
    //       $match: {
    //         _id: ObjectId(boardId)
    //       }
    //     },
    //     {
    //       $addFields: {
    //         _id: { $toString: '$_id' }
    //       }
    //     },
    //     {
    //       $lookup: {
    //         from: 'columns',
    //         localField: '_id',
    //         foreignField: 'boardId',
    //         as: 'columns'
    //       }
    //     }
    //   ])
    //   .toArray();

    /**tt2 */
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray();

    // dùng aggregate, lookup
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data
    };
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew, getFullBoard, pushColumnOrder, update };
