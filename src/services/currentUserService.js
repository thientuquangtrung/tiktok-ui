import * as request from '~/utils/makeRequest';

export const getCurrentUser = async (token) => {
    try {
        if (token) {
            request.setAuthToken(token);
        }
        const res = await request.get('auth/me');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
