import { Request, Response, Router } from 'express';
import asyncRoute from '../../utils/asyncRoute';
import { mapCategory } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json([
            { id: '1', label: 'Consultation' },
            { id: '2', label: 'Cadrage' },
            { id: '3', label: 'Production' },
            { id: '4', label: 'Animation' },
        ].map(mapCategory));
    }),
);

export default router;
