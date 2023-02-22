import * as request from '~/utils/makeRequest';

export const signupAccount = async (payload) => {
    try {
        const res = await request.post('auth/register', {
            type: 'email',
            ...payload,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
