import React from 'react';
import s from './Button.module.css';

function Button({ loadMore }) {
  return (
    <div className={s.ButtonBox}>
      <button onClick={loadMore} type="submit" className={s.Button}>
        Load more
      </button>
    </div>
  );
}

export default Button;
