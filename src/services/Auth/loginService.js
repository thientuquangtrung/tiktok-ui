import * as request from '~/utils/makeRequest';

export const getLoginInfo = async (payload) => {
    try {
        const res = await request.post('auth/login', {
            ...payload,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
