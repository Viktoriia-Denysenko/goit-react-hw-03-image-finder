import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ img, name, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img className={s.image} src={img} alt={name} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
