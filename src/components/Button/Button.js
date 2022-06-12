import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <div className={s.ButtonBox}>
      <button onClick={loadMore} type="submit" className={s.Button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
