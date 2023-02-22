import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './TagGroup.module.scss';
import Tag from '~/components/Tag';

const cx = classNames.bind(styles);

function TagGroup({ heading }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('heading')}>{heading}</p>

            <Tag path="suthatla" label="suthatla" />
            <Tag path="mackedoi" label="mackedoi" />
            <Tag path="sansangthaydoi" label="sansangthaydoi" />
            <Tag
                path="Yêu-Đơn-Phương-Là-Gì-MEE-Remix"
                music
                label="Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n & BHMedia"
            />
            <Tag
                path="Về-Nghe-Mẹ-Ru-NSND-Bach-Tuyet-&-Hứa-Kim-Tuyền-&-14-Casper-&-Hoàng Dũng"
                music
                label="Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng"
            />
            <Tag
                path="Thiên-Thần-Tình-Yêu-RICKY-STAR"
                music
                label="Thiên Thần Tình Yêu - RICKY STAR"
            />
            <Tag path="7749hieuung" label="7749hieuung" />
            <Tag path="genzlife" label="genzlife" />
            <Tag
                path="Tình-Đã-Đầy-Một-Tim-Huyền-Tâm-Môn"
                music
                label="Tình Đã Đầy Một Tim - Huyền Tâm Môn"
            />
            <Tag
                path="Thằng-Hầu-(Thái-Hoàng-Remix)-[Short-Version]-Dunghoangpham"
                music
                label="Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham"
            />
        </div>
    );
}

TagGroup.propTypes = {
    heading: PropTypes.string.isRequired,
};

export default TagGroup;
