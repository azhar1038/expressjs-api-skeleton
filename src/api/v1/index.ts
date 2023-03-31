import { Request, Response, Router } from 'express';
import { registerMiddleware } from './middleware';

export function initRestRoutesV1(router: Router): void {
  const prefix = '/api/v1';
  router.get(prefix, (req: Request, res: Response) => res.send('v1'));

  registerMiddleware(router);
}
