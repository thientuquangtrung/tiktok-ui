import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const createWrapper = (wrapperId) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
};

function Portal({ children, wrapperId }) {
    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            element = createWrapper(wrapperId);
            systemCreated = true;
        }

        setWrapperElement(element);

        return () => {
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    wrapperId: PropTypes.string,
};

export default Portal;
