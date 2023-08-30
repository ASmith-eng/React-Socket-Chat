const LOCALHOST="http://localhost:5050"
const REMOTEHOST="http://192.168.1.188:5050"

export const host = LOCALHOST;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmessage`;
export const getAllMessagesRoute = `${host}/api/messages/getmessages`;