import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    //авторизація: тип Bearer & токен.
    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }

    //sessionsCollection за наданим токеном доступу.
    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
    }

    // перевірка терміну дії токена доступу з порівнянням поточною дати з датою закінчення дії токена.
    const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }
    const user = await UsersCollection.findById(session.userId);
    if (!user) {
        next(createHttpError(401));
    return;
    }
    req.user = user;
    next();
};