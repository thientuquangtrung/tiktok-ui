import PropTypes from 'prop-types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLayoutEffect, useState } from 'react';
import MailLogin from './Forms/DetailForm/MailLogin';
import MailSignup from './Forms/DetailForm/MailSignup';
import Login from './Forms/Login';
import Signup from './Forms/Signup';

function AuthModal({ defaultComponent = 'login' }) {
    const switchModals = (modal) => {
        switch (modal) {
            case 'login':
                return <Login />;
            case 'signup':
                return <Signup />;
            case 'mail-login':
                return <MailLogin />;
            case 'mail-signup':
                return <MailSignup />;
            default:
                break;
        }
    };

    const [defaultElement, setDefaultElement] = useState([switchModals(defaultComponent)]);

    useLayoutEffect(() => {
        const trigger = document.getElementById('modals-root');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (e.target.closest('a') && e.target.closest('a').hasAttribute('data-auth-modal')) {
                    e.preventDefault();
                    setDefaultElement((prev) => [
                        ...prev,
                        switchModals(e.target.closest('a').getAttribute('data-auth-modal')),
                    ]);
                }
            });
        }
    }, []);

    return (
        <>
            {/* show/hide the back btn */}
            {defaultElement.length > 1 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        cursor: 'pointer',
                        padding: '6px',
                        fontSize: '20px',
                    }}
                    onClick={() => setDefaultElement((prev) => prev.slice(0, prev.length - 1))}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            )}

            {/* get the last element to display */}
            {defaultElement[defaultElement.length - 1]}
        </>
    );
}

AuthModal.propTypes = {
    defaultComponent: PropTypes.string,
};

export default AuthModal;
