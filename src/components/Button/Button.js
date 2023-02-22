import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    rounded = false,
    squared = false,
    disabled = false,
    end = false,
    leftIcon,
    rightIcon,
    children,
    className,
    onClick,
    ...others
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...others,
    };

    // remove event handler when disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (href) {
        Comp = 'a';
        props.href = href;
    } else if (to && end) {
        Comp = NavLink;
        props.to = to;
        props.end = end;
    } else if (to) {
        Comp = Link;
        props.to = to;
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        rounded,
        squared,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <i className={cx('icon')}>{leftIcon}</i>}
            <span className={cx('btn-label')}>{children}</span>
            {rightIcon && <i className={cx('icon')}>{rightIcon}</i>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    squared: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
