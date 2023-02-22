import { forwardRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './MainDisplay.module.scss';
import Avatar from '~/components/Avatar';
import Video from '~/components/Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/layouts/components/Sidebar/SidebarAccounts/AccountPreview';
import Tag from '~/components/Tag';
import Modal from '~/components/Modal';
import { AuthModal } from '~/components/AuthForm';
import AuthContext from '~/components/Contexts/AuthContext';
import { useFollowing } from '~/hooks';

const cx = classNames.bind(styles);

function DisplayItem({ onShow, data }, ref) {
    const { handleAuthAction, currentUser } = useContext(AuthContext);
    const user = data.user;

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div ref={ref} className={cx('wrapper')}>
            {following ? (
                <Button small squared className={cx('follow-btn')} onClick={() => handleUnFollowing(user.id)}>
                    Following
                </Button>
            ) : (
                <Button
                    small
                    outline
                    className={cx('follow-btn')}
                    onClick={() =>
                        handleAuthAction(
                            () => handleFollowing(user.id),
                            () => setIsModalOpen(true),
                        )
                    }
                >
                    Follow
                </Button>
            )}
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
            <div className={cx('content')}>
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
                <section className={cx('body')}>
                    <div onClick={(e) => onShow(e, data)} className={cx('video')}>
                        <Video data={data} />
                    </div>
                    <div className={cx('reactions')}>
                        {currentUser ? (
                            <>
                                <div className={cx('react-wrapper')}>
                                    <div className={cx('react-type')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                    <span className={cx('quantity')}>{data.likes_count}</span>
                                </div>
                                <div className={cx('react-wrapper')}>
                                    <div className={cx('react-type')}>
                                        <FontAwesomeIcon icon={faCommentDots} />
                                    </div>
                                    <span className={cx('quantity')}>{data.comments_count}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('react-wrapper')} onClick={() => setIsModalOpen(true)}>
                                    <div className={cx('react-type')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                    <span className={cx('quantity')}>{data.likes_count}</span>
                                </div>
                                <div className={cx('react-wrapper')} onClick={() => setIsModalOpen(true)}>
                                    <div className={cx('react-type')}>
                                        <FontAwesomeIcon icon={faCommentDots} />
                                    </div>
                                    <span className={cx('quantity')}>{data.comments_count}</span>
                                </div>
                            </>
                        )}

                        <div className={cx('react-wrapper')}>
                            <div className={cx('react-type')}>
                                <FontAwesomeIcon icon={faShare} />
                            </div>
                            <span className={cx('quantity')}>{data.shares_count}</span>
                        </div>
                    </div>
                </section>
            </div>
            <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                <AuthModal />
            </Modal>
        </div>
    );
}

DisplayItem.propTypes = {
    data: PropTypes.array.isRequired,
};

export default forwardRef(DisplayItem);
