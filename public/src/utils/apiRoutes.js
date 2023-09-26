let hostname = '';
switch(process.env.NODE_ENV) {
    case 'production':
        hostname = process.env.REACT_APP_PRODUCTION_HOSTNAME;
        break;
    case 'development':
        hostname = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        break;
    default:
        hostname = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        break;
}
       
export const host = hostname;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmessage`;
export const getAllMessagesRoute = `${host}/api/messages/getmessages`;
export const getOnlineStatusRoute = `${host}/api/messages/getonlinestatus`;