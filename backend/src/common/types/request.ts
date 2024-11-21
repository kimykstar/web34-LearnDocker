import { UserSession } from './session';
import { Request } from 'express';

export interface RequestWithSession extends Request {
    session: UserSession;
}
