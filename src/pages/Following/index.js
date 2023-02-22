import { useContext } from 'react';

import AuthContext from '~/components/Contexts/AuthContext';
import LoginFollowing from './LoginFollowing';
import UnloginFollowing from './UnloginFollowing';

function Following() {
    const { currentUser } = useContext(AuthContext);

    return currentUser ? <LoginFollowing /> : <UnloginFollowing />;
}

export default Following;
