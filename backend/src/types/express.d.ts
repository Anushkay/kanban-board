import { User } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }
}


export interface AuthenticatedRequest extends Express.Request {
  user: InstanceType<typeof User>;
}