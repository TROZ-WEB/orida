import { Request, Response, Router } from 'express';
import asyncRoute from '../../utils/asyncRoute';
import { mapCategory } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json([
            { id: '1', label: 'Cadre de vie', picture: 'https://placekitten.com/45/45' },
            { id: '2', label: 'Culture', picture: 'https://placekitten.com/45/45' },
            { id: '3', label: 'Jeunesse', picture: 'https://placekitten.com/45/45' },
            { id: '4', label: 'Environnement', picture: 'https://placekitten.com/45/45' },
        ].map(mapCategory));
    }),
);

export default router;
