import React from 'react';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ img, name, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img className={s.image} src={img} alt={name} />
    </li>
  );
}

export default ImageGalleryItem;
