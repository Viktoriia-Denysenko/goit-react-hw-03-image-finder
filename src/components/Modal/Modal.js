import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      this.props.pictures.map(picture => (
        <div
          key={picture.id}
          className={s.Overlay}
          onClick={this.handleOverlay}
        >
          <div className={s.Modal}>
            <img src={picture.largeImageURL} alt={picture.tags} />
            {/* <img src={this.props.children} alt="" /> */}
          </div>
        </div>
      )),
      modalRoot
    );
  }
}
export default Modal;
