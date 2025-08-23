import { Router } from 'express';
import { getStats } from '../controllers/statsController.js';

const router = Router();

// This will create a public API endpoint at GET /api/stats
router.get('/', getStats);

export { router as statsRoutes };