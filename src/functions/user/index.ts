import { handlerPath } from '@libs/handler-resolver';


export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: '/users/register',
            },
        },
    ],
    timeout: 10
};
export const signinUser = {
    handler: `${handlerPath(__dirname)}/handler.signinUser`,
    events: [
        {
            http: {
                method: 'post',
                path: '/users/signin',
            },
        },
    ],
    timeout: 10
};