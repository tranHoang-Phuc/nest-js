import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private readonly validToken: string[] = [
    'randomToken1',
    'randomToken2',
    'randomToken3',
  ];

  private isValidToken(token: string): boolean {
    const parts = token.split('Bearer');
    return this.validToken.includes(parts[1].trim());
  }

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token || !this.isValidToken(token)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req['token'] = token;
    next();
  }
}
