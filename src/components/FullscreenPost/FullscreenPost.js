import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Video from '~/components/Video';
import styles from './FullscreenPost.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/layouts/components/Sidebar/SidebarAccounts/AccountPreview';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Tag from '~/components/Tag';
import { useFollowing } from '~/hooks';

const cx = classNames.bind(styles);

function FullscreenPost({ data }) {
    const user = data.user;

    const { following, handleFollowing, handleUnFollowing } = useFollowing(user.is_followed);

    const renderItem = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview data={user} bio funcs={{ following, handleFollowing, handleUnFollowing }} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div style={{ backgroundImage: `url(${data.thumb_url})` }} className={cx('bg')}></div>
                <div className={cx('filter')}></div>
                <Video data={data} large />
            </div>
            <div className={cx('right')}>
                <div className={cx('avatar')}>
                    <Tippy
                        interactive
                        // visible
                        placement="bottom-start"
                        offset={[-5, 5]}
                        delay={[1000, 0]}
                        hideOnClick={true}
                        render={renderItem}
                    >
                        <Link to={`@${user.nickname}`}>
                            <Avatar width="56px" height="56px" src={user.avatar} alt={user.nickname} />
                        </Link>
                    </Tippy>
                </div>
                <header className={cx('header')}>
                    <Tippy
                        interactive
                        // visible
                        placement="bottom-start"
                        offset={[-73, 40]}
                        delay={[1000, 0]}
                        hideOnClick={true}
                        render={renderItem}
                    >
                        <Link to={`@${user.nickname}`} className={cx('author')}>
                            <h3 className={cx('nickname')}>
                                {user.nickname}
                                {user.tick && (
                                    <span className={cx('check')}>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </span>
                                )}
                            </h3>
                            <h4 className={cx('full-name')}>{`${user.first_name} ${user.last_name}`}</h4>
                        </Link>
                    </Tippy>

                    <div className={cx('desc')}>
                        <span className={cx('text')}>{data.description}</span>
                        {/* tags */}
                    </div>

                    <h4 className={cx('music')}>
                        <Tag
                            music
                            label={data.music || 'nhạc nền - tổng hợp'}
                            path={data.music || 'nhạc nền - tổng hợp'}
                            texted
                        />
                    </h4>
                </header>
            </div>
        </div>
    );
}

export default FullscreenPost;
