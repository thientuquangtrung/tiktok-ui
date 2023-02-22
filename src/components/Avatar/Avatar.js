import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Image from '~/components/Image';
import images from '~/assets/images';

// console.log(styles);

const Avatar = forwardRef(({ width = '32px', height = '32px', src, alt, className }, ref) => {
    const dimensionStyle = {
        width,
        height,
    };

    return (
        <div ref={ref} className={className} style={dimensionStyle}>
            <Image src={src} alt={alt} className="avatar" fallBack={images.person} />
        </div>
    );
});

Avatar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default Avatar;
