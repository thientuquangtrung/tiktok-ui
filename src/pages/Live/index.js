import images from '~/assets/images';
import styles from './Live.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Live() {
    const currentLive = false;

    return (
        <div className={cx('container')}>
            {!currentLive && <img src={images.noLiving} alt="no-livestream" className={cx('no-live-img')} />}
        </div>
    );
}

export default Live;
