/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import asyncRoute from '../../utils/asyncRoute';
import { mapCategory } from '../mappers';

const router = Router();
const date = new Date();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json([
            { id: '1', label: 'Consultation', picture: 'https://placekitten.com/45/45', projects: [], createdAt: date, modifiedAt: date },
            { id: '2', label: 'Cadrage', picture: 'https://placekitten.com/45/45', projects: [], createdAt: date, modifiedAt: date },
            { id: '3', label: 'Production', picture: 'https://placekitten.com/45/45', projects: [], createdAt: date, modifiedAt: date },
            { id: '4', label: 'Animation', picture: 'https://placekitten.com/45/45', projects: [], createdAt: date, modifiedAt: date },
        ].map(mapCategory));
    }),
);

export default router;
