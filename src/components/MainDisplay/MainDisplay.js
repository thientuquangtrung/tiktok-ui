import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MainDisplay.module.scss';
import DisplayItem from './DisplayItem';
import { forwardRef, useState } from 'react';
import { TiktokContentLoader } from '~/components/Loaders';
import FullscreenPost from '~/components/FullscreenPost';

const cx = classNames.bind(styles);

const MainDisplay = forwardRef(({ data, loadMore }, ref) => {
    const [showLargeDisplay, setShowLargeDisplay] = useState(false);
    const [video, setVideo] = useState(null);

    const toggleShow = (e, data) => {
        if (e.target.tagName === 'VIDEO') {
            setVideo(data);
            setShowLargeDisplay((prev) => !prev);
        }
    };

    return (
        <div className={cx('container')}>
            {data.map((video, index) => {
                if (index + 1 === data.length) {
                    return <DisplayItem onShow={toggleShow} ref={ref} key={video.id} data={video} />;
                } else {
                    return <DisplayItem onShow={toggleShow} key={video.id} data={video} />;
                }
            })}

            {loadMore && <TiktokContentLoader />}

            {showLargeDisplay && video && <FullscreenPost data={video} />}
        </div>
    );
});

MainDisplay.displayName = 'MainDisplay';

MainDisplay.propTypes = {
    data: PropTypes.array.isRequired,
    loadMore: PropTypes.bool,
};

export default MainDisplay;
