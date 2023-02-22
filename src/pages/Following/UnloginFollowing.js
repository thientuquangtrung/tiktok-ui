import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { TiktokContentLoader } from '~/components/Loaders';
import * as usersService from '~/services/usersService';
import styles from './UnloginFollowing.module.scss';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

function UnloginFollowing() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const res = await usersService.getSuggested(page, 15);
            setData((prev) => [...prev, ...res]);

            setLoading(false);
        };
        fetchApi();
    }, [page]);

    let currentPlaying = null;
    const handleMouseOver = (e) => {
        if (currentPlaying && currentPlaying !== e.target) {
            currentPlaying.load();
        }
        currentPlaying = e.target;
        e.target.play();
    };

    const observer = useRef();
    const lastItem = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    return (
        <div className={cx('cards-list')}>
            {data.map((user, index) => {
                return (
                    <Link to={`/@${user.nickname}`} key={user.id} className={cx('card-item')}>
                        {index === data.length - 1 ? (
                            <video
                                ref={lastItem}
                                className={cx('video')}
                                src={user.popular_video.file_url}
                                poster={user.popular_video.thumb_url}
                                muted
                                onMouseOver={handleMouseOver}
                            />
                        ) : (
                            <video
                                className={cx('video')}
                                src={user.popular_video.file_url}
                                poster={user.popular_video.thumb_url}
                                muted
                                onMouseOver={handleMouseOver}
                            />
                        )}

                        <div className={cx('info')}>
                            <Avatar
                                className={cx('avatar')}
                                width="48px"
                                height="48px"
                                src={user.avatar}
                                alt={user.nickname}
                            />
                            <h3 className={cx('full-name')}>{`${user.first_name} ${user.last_name}`}</h3>
                            <h4 className={cx('nickname')}>
                                {user.nickname}
                                {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            </h4>
                            <Button className={cx('btn')} primary large>
                                Follow
                            </Button>
                        </div>
                    </Link>
                );
            })}

            {loading && page !== 1 && <TiktokContentLoader />}
        </div>
    );
}

export default UnloginFollowing;
