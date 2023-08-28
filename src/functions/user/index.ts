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
};