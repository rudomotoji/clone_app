import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './Column.scss';
import { cloneDeep } from 'lodash';

import { Dropdown, Form, Button } from 'react-bootstrap';

import { mapOrder } from 'utils/sort';
import { MODAL_ACTION_CONFIRM, MODAL_ACTION_CLOSE } from 'utils/constants';
import {
  saveContentAfterPressEnter,
  selectAllInLineText
} from 'utils/contantEditable';

import Card from 'components/Card/Card.jsx';
import ConfirmModal from 'components/Common/Confirmmodal';
import { useRef, useState, useEffect } from 'react';

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, '_id');

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');

  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value);
  const [openNewCardForm, setOpenCardForm] = useState(false);

  const [newCardTitle, setNewCardTitle] = useState('');
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  const toggleOpenNewCardForm = () => setOpenCardForm(!openNewCardForm);
  const newCardTextareaRef = useRef(null);

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);
  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
      newCardTextareaRef.current.select();
    }
  }, [openNewCardForm]);

  const onConfirmAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = { ...column, _destroy: true };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const toggleShowConfirmModal = () => setConfirmRemove(!confirmRemove);

  const handleColumnTitleChangeBlur = () => {
    const newColumn = { ...column, title: columnTitle };
    onUpdateColumn(newColumn);
  };

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.fofcus();
      return;
    }

    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5), //random 5 characters and remove
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
      cover: null
    };

    let newColumn = cloneDeep(column);
    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd._id);

    onUpdateColumn(newColumn);
    setNewCardTitle('');
    toggleOpenNewCardForm();
  };

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          {/* {column.title} */}
          <Form.Control
            size='sm'
            type='text'
            placeholder='Enter new column'
            className='content-editable'
            value={columnTitle}
            spellCheck='false'
            onClick={selectAllInLineText}
            onMouseDown={(e) => e.preventDefault()}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleChangeBlur}
            onKeyDown={saveContentAfterPressEnter}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle
              size='sm'
              id='dropdown-basic'
              className='btn-dropdown'
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add Card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove Card
              </Dropdown.Item>
              <Dropdown.Item>Move all card in this column (beta)</Dropdown.Item>
              <Dropdown.Item>archive (beta)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list'>
        <Container
          groupName='col'
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className='add-new-card-area'>
            <Form.Control
              size='sm'
              as='textarea'
              rows='3'
              placeholder='Enter a title for this card..'
              className='textarea-enter-new-card'
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(event) => event.key === 'Enter' && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className='add-new-card-actions'>
            <Button variant='success' size='sm' onClick={addNewCard}>
              Add card
            </Button>
            <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
              <i className='fa fa-trash icon' />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className='footer-actions' onClick={toggleOpenNewCardForm}>
            <i className='fa fa-plus icon' />
            Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        title={'Remove column'}
        show={confirmRemove}
        onAction={onConfirmAction}
        content={`Are you sure you want to remove <strong>${column.title}</strong>!</br> All related cards eill also be removed!`}
      />
    </div>
  );
}

export default Column;
