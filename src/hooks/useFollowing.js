import { useState } from 'react';
import * as usersService from '~/services/usersService';

const useFollowing = (isFollowed) => {
    const [following, setFollowing] = useState(isFollowed);

    const handleFollowing = (id) => {
        usersService.followAnUser(id);
        setFollowing(true);
    };

    const handleUnFollowing = (id) => {
        usersService.unFollowAnUser(id);
        setFollowing(false);
    };

    return { following, handleFollowing, handleUnFollowing };
};

export default useFollowing;
