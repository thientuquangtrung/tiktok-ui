import * as request from '~/utils/makeRequest';

export const logoutCurrentUser = async () => {
    try {
        const res = await request.post('auth/logout');
        return res;
    } catch (error) {
        console.log(error);
    }
};
