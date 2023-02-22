import PropTypes from 'prop-types';
import { useState } from 'react';

import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = ({ ref, src, alt, className, fallBack: customFallBack, ...props }) => {
    const [fallBack, setFallBack] = useState('');

    const handleNoImage = () => {
        if (customFallBack) setFallBack(customFallBack);
        else setFallBack(images.noImage);
    };

    return (
        <img
            className={cx('wrapper', className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleNoImage}
        />
    );
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
