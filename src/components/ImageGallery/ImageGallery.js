import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ pictures, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          img={picture.webformatURL}
          onClick={onClick}
          name={picture.tags}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
