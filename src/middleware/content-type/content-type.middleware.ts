import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  private static readonly METHODS_REQUIRING_JSON = new Set([
    'POST',
    'PUT',
    'PATCH',
  ]);

  use(req: Request, res: Response, next: NextFunction): void {
    if (!ContentTypeMiddleware.METHODS_REQUIRING_JSON.has(req.method)) {
      next();
      return;
    }

    const header = req.headers['content-type'];
    if (typeof header !== 'string' || header.trim() === '') {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Content-Type header is missing.' });
      return;
    }

    const mime = header.split(';', 1)[0].trim().toLowerCase();
    if (mime !== 'application/json') {
      res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json({
        message: 'Unsupported Media Type. Only application/json is supported.',
      });
      return;
    }

    next();
  }
}
