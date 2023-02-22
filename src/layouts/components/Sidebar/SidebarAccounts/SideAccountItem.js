import Tippy from '@tippyjs/react/headless';

import AccountPreview from './AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { AccountItem } from '~/components/AccountItem';
import { useFollowing } from '~/hooks';

function SideAccountItem({ data, isFollowing }) {
    const { following, handleFollowing, handleUnFollowing } = useFollowing(data.is_followed);

    const renderItem = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview data={data} funcs={{ following, handleFollowing, handleUnFollowing }} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy
            disabled={isFollowing}
            interactive
            // visible
            placement="bottom"
            offset={[-20, 0]}
            delay={[1000, 1000]}
            hideOnClick={true}
            render={renderItem}
        >
            <AccountItem avaW="32px" avaH="32px" small data={data} />
        </Tippy>
    );
}

export default SideAccountItem;
