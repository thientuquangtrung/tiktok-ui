import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer({ className, horizontal }) {
    return (
        <footer
            className={cx('footer', {
                [className]: className,
                horizontal,
            })}
        >
            {horizontal && (
                <div className={cx('logo')}>
                    <img style={{ width: '100%' }} src={images.darkLogo} alt="tiktok" />
                </div>
            )}
            <div className={cx('footer-list')}>
                {horizontal && <span className={cx('label')}>Company</span>}
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/about?lang=en"
                    data-e2e="page-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    About
                </a>
                <a
                    rel="noreferrer"
                    href="https://newsroom.tiktok.com/"
                    data-e2e="page-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Newsroom
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/about/contact?lang=en"
                    data-e2e="page-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Contact
                </a>
                <a
                    rel="noreferrer"
                    href="https://careers.tiktok.com"
                    data-e2e="page-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Careers
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.bytedance.com/"
                    data-e2e="page-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    ByteDance
                </a>
            </div>
            <div className={cx('footer-list')}>
                {horizontal && <span className={cx('label')}>Program</span>}
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/forgood"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    TikTok for Good
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&amp;attr_source=tt_official_site&amp;refer=tiktok_web"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Advertise
                </a>
                <a
                    rel="noreferrer"
                    href="https://developers.tiktok.com/?refer=tiktok_web"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Developers
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/transparency?lang=en"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Transparency
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/tiktok-rewards/en"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    TikTok Rewards
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/browse"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    TikTok Browse
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/embed"
                    data-e2e="program-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    TikTok Embeds
                </a>
            </div>
            <div className={cx('footer-list')}>
                {horizontal && <span className={cx('label')}>Support</span>}
                <a
                    rel="noreferrer"
                    href="https://support.tiktok.com/en"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Help
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/safety?lang=en"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Safety
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/legal/terms-of-service?lang=en"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Terms
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/legal/privacy-policy-row?lang=en"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Privacy
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/creators/creator-portal/en-us/"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Creator Portal
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.tiktok.com/community-guidelines?lang=en"
                    data-e2e="legal-link"
                    target="_blank"
                    className={cx('footer-item')}
                >
                    Community Guidelines
                </a>
            </div>
            <span className={cx('copyright')}>© {new Date().getFullYear()} TikTok</span>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
