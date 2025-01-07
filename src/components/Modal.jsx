import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">{buttonCaption}</button>
          </form>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal-root'),
  );
});

export default Modal;
