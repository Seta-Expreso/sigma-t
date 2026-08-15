/**
 * @fileoverview Tipos extendidos para Express
 * @module types/express
 */

import type { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}