import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SidebarAccounts.module.scss';
import { Button } from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountPreview({ data, bio, funcs }) {
    return (
        <main className={cx('contain')}>
            <header className={cx('header')}>
                <a href={`/@${data.nickname}`} target="_blank" rel="noreferrer">
                    <img className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                </a>
                {funcs?.following ? (
                    <Button small squared className={cx('follow-btn')} onClick={() => funcs.handleUnFollowing(data.id)}>
                        Following
                    </Button>
                ) : (
                    <>
                        {bio ? (
                            <Button outline className={cx('follow-btn')} onClick={() => funcs.handleFollowing(data.id)}>
                                Follow
                            </Button>
                        ) : (
                            <Button primary className={cx('follow-btn')} onClick={() => funcs.handleFollowing(data.id)}>
                                Follow
                            </Button>
                        )}
                    </>
                )}
            </header>
            <section className={cx('body')}>
                <a href={`/@${data.nickname}`} target="_blank" rel="noreferrer">
                    <h3 className={cx('nickname')}>
                        {data.nickname}
                        {data.tick && (
                            <span className={cx('check')}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                        )}
                    </h3>
                    <p className={cx('name')}>{data.full_name}</p>
                </a>
            </section>
            <footer className={cx('statistic')}>
                <strong className={cx('value')}>{data.followers_count}</strong>
                <span className={cx('label')}>Followers</span>
                <strong className={cx('value')}>{data.likes_count}</strong>
                <span className={cx('label')}>Likes</span>
            </footer>
            {bio && <section className={cx('extra')}>{data.bio}</section>}
        </main>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
