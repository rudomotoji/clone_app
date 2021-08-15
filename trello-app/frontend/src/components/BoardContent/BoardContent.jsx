import React, { useState, useEffect, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './BoardContent.scss';
import { isEmpty, cloneDeep } from 'lodash';
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

import Column from 'components/Column/Column';

import { mapOrder } from 'utils/sort';
import { applyDrag } from 'utils/dragDrop';
import {
  fetchcBoardDetails,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard
} from 'actions/apis';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [openNewColumnForm, setOpenColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () => setOpenColumnForm(!openNewColumnForm);

  const newColumnInputRef = useRef(null);

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

  useEffect(() => {
    fetchcBoardDetails('61137dd7d312f0300cbaf40e').then((board) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'));
    });
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return (
      <div className='not-found' style={{ padding: '10px', color: 'white' }}>
        Board not found
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    //kéo thả column
    let newColumns = cloneDeep(columns);
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

    //call api update columnOrder in board detail
    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumns(columns);
      setBoard(board);
    });
  };

  const onCardDrop = (columnId, dropResult) => {
    //kéo thả card
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns);

      let currentColumn = newColumns.find((c) => c._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);

      setColumns(newColumns);
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * move card inside
         * call api update cardOrder in currend column
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns);
        });
      } else {
        /**
         * move card between 2 columns
         * call api update cardOrder in current column
         * call api update columnId in current card
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns);
        });
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = currentColumn._id;

          updateCard(currentCard._id, currentCard);
        }
      }
    }
  };

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdUpdate = newColumnToUpdate._id;
    let newColumns = cloneDeep(columns);
    const columnIndexUpdate = newColumns.findIndex(
      (i) => i._id === columnIdUpdate
    );

    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexUpdate, 1);
    } else {
      newColumns.splice(columnIndexUpdate, 1, newColumnToUpdate);
    }

    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    };

    createNewColumn(newColumnToAdd).then((column) => {
      let newColumns = cloneDeep(columns);
      newColumns.push(column);

      let newBoard = cloneDeep(board);
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
      setOpenColumnForm(false);
      setNewColumnTitle('');
    });
  };

  return (
    <div className='board-content'>
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector='.column-drag-handle'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className='bootstrap-container'>
        {!openNewColumnForm && (
          <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
              <i className='fa fa-plus icon' />
              Add another column
            </Col>
          </Row>
        )}

        {openNewColumnForm && (
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Enter new column'
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === 'Enter' && addNewColumn()}
              />
              <Button onClick={addNewColumn} variant='success' size='sm'>
                Add column
              </Button>
              <span className='cancel-icon' onClick={toggleOpenNewColumnForm}>
                <i className='fa fa-trash icon' />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
