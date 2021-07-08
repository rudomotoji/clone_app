import React from 'react';
import './Column.scss';

import Task from './Column';

function Column() {
  return (
    <div className='column'>
      <header>Brainstorm</header>
      <ul className='task-list'>
        <Task />
        <li className='task-item'>Singleton Pattern</li>
        <li className='task-item'>Singleton Pattern</li>
        <li className='task-item'>Singleton Pattern</li>
        <li className='task-item'>Singleton Pattern</li>
        <li className='task-item'>Singleton Pattern</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
