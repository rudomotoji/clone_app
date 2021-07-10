import React, { useState, useEffect, useCallback } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './Column.scss';

import { Dropdown, Form } from 'react-bootstrap';

import { mapOrder } from 'utils/sort';
import { MODAL_ACTION_CONFIRM, MODAL_ACTION_CLOSE } from 'utils/constants';
import {
  saveContentAfterPressEnter,
  selectAllInLineText
} from 'utils/contantEditable';

import Card from 'components/Card/Card.jsx';
import ConfirmModal from 'components/Common/Confirmmodal';

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');

  const handleColumnTitleChange = useCallback((e) => {
    setColumnTitle(e.target.value);
  }, []);
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
      </div>
      <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon' />
          Add another card
        </div>
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
