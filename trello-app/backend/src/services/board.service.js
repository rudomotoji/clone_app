import { BoardModel } from '@/models/board.model';
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);
    if (!board || !board.columns) {
      throw new Error('Board not found');
    }

    const transformBoards = cloneDeep(board);
    transformBoards.columns = transformBoards.columns.filter(
      (column) => !column._destroy
    );

    transformBoards.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    delete transformBoards.cards;

    return transformBoards;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
