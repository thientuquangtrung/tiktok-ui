import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnUser } from '~/services/usersService';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Avatar from '~/components/Avatar';
import { Button } from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faLock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    const name = location.pathname.replace('/', '');
    const [userNickname, setUserNickname] = useState(name);
    const [user, setUser] = useState();
    const [tab, setTab] = useState('videos');
    const [borderPosition, setBorderPosition] = useState(0);

    useEffect(() => {
        setUserNickname(name);
    }, [location.pathname, name]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAnUser(userNickname);
            setUser(res);
        };

        fetchApi();
    }, [userNickname]);

    let currentPlaying = null;
    const handleMouseOverCard = (e) => {
        if (currentPlaying && currentPlaying !== e.target) {
            currentPlaying.load();
        }
        currentPlaying = e.target;
        e.target.play();
    };

    const handleMouseOverTab = (tabName) => {
        if (tabName === 'videos') {
            setBorderPosition(0);
        } else if (tabName === 'liked') {
            setBorderPosition('230px');
        }
    };

    const handleSwitchTab = (tabName) => {
        if (tabName === 'videos') {
            setTab('videos');
            setBorderPosition(0);
        } else if (tabName === 'liked') {
            setTab('liked');
            setBorderPosition('230px');
        }
    };

    const handleMouseOut = () => {
        if (tab === 'videos') {
            setBorderPosition(0);
        } else if (tab === 'liked') {
            setBorderPosition('230px');
        }
    };

    return (
        <>
            {user && (
                <div className={cx('wrapper')}>
                    <div className={cx('userInfo')}>
                        <div className={cx('heading')}>
                            <Avatar width="116px" height="116px" src={user.avatar} alt={user.nickname} />
                            <div className={cx('info')}>
                                <h2 className={cx('nickname')}>{user.nickname}</h2>
                                <h1 className={cx('name')}>{`${user.first_name} ${user.last_name}`}</h1>
                                <Button className={cx('follow-btn')} primary large>
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className={cx('statistic')}>
                            <span className={cx('count')}>
                                <strong className={cx('number')}>{user.followings_count}</strong> Following
                            </span>
                            <span className={cx('count')}>
                                <strong className={cx('number')}>{user.followers_count}</strong> Followers
                            </span>
                            <span className={cx('count')}>
                                <strong className={cx('number')}>{user.likes_count}</strong> Likes
                            </span>
                        </div>
                        <p className={cx('bio')}>{user.bio}</p>
                        <div className={cx('btns')}>
                            <i>
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </i>
                            <i>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </i>
                        </div>
                    </div>
                    <div className={cx('userVideo')}>
                        <div className={cx('tabs')}>
                            <div
                                className={cx('tab', {
                                    active: tab === 'videos',
                                })}
                                onMouseOver={() => handleMouseOverTab('videos')}
                                onClick={() => handleSwitchTab('videos')}
                                onMouseOut={handleMouseOut}
                            >
                                Videos
                            </div>
                            <div
                                className={cx('tab', {
                                    active: tab === 'liked',
                                })}
                                onMouseOver={() => handleMouseOverTab('liked')}
                                onClick={() => handleSwitchTab('liked')}
                                onMouseOut={handleMouseOut}
                            >
                                <FontAwesomeIcon icon={faLock} className={cx('tab-icon')} />
                                Liked
                            </div>
                            <div
                                className={cx('bottom-line')}
                                style={{ transform: `translateX(${borderPosition})` }}
                            ></div>
                        </div>
                        {tab === 'videos' && (
                            <div className={cx('videos')}>
                                {user.videos.map((video) => {
                                    return (
                                        <div key={video.id} className={cx('video-container')}>
                                            <div className={cx('frame')}>
                                                <video
                                                    src={video.file_url}
                                                    poster={video.thumb_url}
                                                    onMouseOver={handleMouseOverCard}
                                                    muted
                                                />
                                                <span className={cx('view')}>
                                                    <FontAwesomeIcon icon={faPlay} /> {video.views_count}
                                                </span>
                                            </div>
                                            <p className={cx('desc')}>{video.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {tab === 'liked' && (
                            <div className={cx('error-container')}>
                                <svg
                                    width="90"
                                    data-e2e=""
                                    height="90"
                                    viewBox="0 0 48 48"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ fillOpacity: '0.34', marginBottom: '24px' }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24 8.5C20.9624 8.5 18.5 10.9624 18.5 14V18.5H29.5V14C29.5 10.9624 27.0376 8.5 24 8.5ZM32.5 18.5V14C32.5 9.30558 28.6944 5.5 24 5.5C19.3056 5.5 15.5 9.30558 15.5 14V18.5H11C9.61929 18.5 8.5 19.6193 8.5 21V40C8.5 41.3807 9.61929 42.5 11 42.5H37C38.3807 42.5 39.5 41.3807 39.5 40V21C39.5 19.6193 38.3807 18.5 37 18.5H32.5ZM11.5 21.5V39.5H36.5V21.5H11.5Z"
                                    ></path>
                                </svg>
                                <p className={cx('error-mess')}>This user's liked videos are private</p>
                                <p className={cx('error-desc')}>Videos liked by {user.nickname} are currently hidden</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
