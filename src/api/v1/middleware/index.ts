import cors from 'cors';
import { json, Router } from 'express';
import { env } from '../../../config/globals';

export function registerMiddleware(router: Router): void {
  if (env.NODE_ENV === 'development') {
    router.use(cors());
  } else {
    router.use(cors({ origin: [env.DOMAIN] }));
  }

  router.use(json());
}
