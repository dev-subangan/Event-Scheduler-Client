import axios from 'axios';

export const accessTokenText = "accessToken";
export const refreshTokenText = "refreshToken";
export const expirationTimeText = "expirationTime";

/**
 * Returns access token
 */
export const getAccessToken = async () => {
    if (isAccessTokenExpired()) {
        const refreshtoken = sessionStorage.getItem(refreshTokenText);
        const token = await getFreshToken(refreshtoken);
        sessionStorage.setItem(accessTokenText, token.accessToken);
        sessionStorage.setItem(expirationTimeText, getNewExpirationTime());
        return token.accessToken;
    } else {
        return sessionStorage.getItem(accessTokenText);
    }
};

/**
 * Returns new expiration time
 */
export const getNewExpirationTime = () => {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    return expirationTime;
};

/**
 * Returns True, if token expired
 * Returns False, if token not expired
 */
const isAccessTokenExpired = () => {
    return Date.now() > new Date(sessionStorage.getItem(expirationTimeText)).getTime();
};

/**
 * Obtain fresh access token by sending refreshToken
 */
const getFreshToken = async (refreshToken) => {
    return await axios.post("http://localhost:8080/getToken",
        { refreshToken: refreshToken, },
        { headers: { "Content-Type": "application/json", } }
    )
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error.message))
};