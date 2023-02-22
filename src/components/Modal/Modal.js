import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.scss';
import Portal from '~/components/Portal';
import { CloseIcon } from '~/components/Icons';
import './Modal.scss';

const cx = classNames.bind(styles);

function Modal({ children, isOpen, handleClose }) {
    const nodeRef = useRef(null);

    useEffect(() => {
        const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [handleClose]);

    // if (!isOpen) return null;

    return (
        <Portal wrapperId="modals-root">
            <CSSTransition
                in={isOpen}
                timeout={{ entry: 0, exit: 300 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className={cx('modal')} ref={nodeRef}>
                    <div className={cx('overlay')} onClick={handleClose}></div>
                    <div className={cx('content')}>
                        <button onClick={handleClose} className={cx('close-btn')}>
                            <CloseIcon />
                        </button>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default Modal;
