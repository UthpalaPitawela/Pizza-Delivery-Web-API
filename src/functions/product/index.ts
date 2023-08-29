import { handlerPath } from '@libs/handler-resolver';


export const createProducts = {
    handler: `${handlerPath(__dirname)}/handler.createProducts`,
    events: [
        {
            http: {
                method: 'post',
                path: '/products',
            },
        },
    ],
    timeout: 10
};
