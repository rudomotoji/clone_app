const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
  }
};

const selectAllInLineText = (e) => {
  e.target.focus();
  e.target.select();
};

export { saveContentAfterPressEnter, selectAllInLineText };
