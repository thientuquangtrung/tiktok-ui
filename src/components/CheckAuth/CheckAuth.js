import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '~/components/Contexts/AuthContext';

function CheckAuth({ children }) {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
