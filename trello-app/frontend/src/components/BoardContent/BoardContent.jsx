import React, { useState, useEffect, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './BoardContent.scss';
import { isEmpty } from 'lodash';
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
import { fetchcBoardDetails, createNewColumn } from 'actions/apis';

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
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);

      setColumns(newColumns);
    }
  };

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdUpdate = newColumnToUpdate._id;
    let newColumns = [...columns];
    const columnIndexUpdate = newColumns.findIndex(
      (i) => i._id === columnIdUpdate
    );

    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexUpdate, 1);
    } else {
      newColumns.splice(columnIndexUpdate, 1, newColumnToUpdate);
    }

    let newBoard = { ...board };
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
      let newColumns = [...columns];
      newColumns.push(column);

      let newBoard = { ...board };
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
