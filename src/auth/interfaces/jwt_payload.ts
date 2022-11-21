import * as jwt from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  driverNumber: number;
}
