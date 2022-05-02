/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import findAllCategories from '../../useCases/categories/findAllCategories';
import asyncRoute from '../../utils/asyncRoute';
import { categoryRepository } from '../database';
import { mapCategory } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const categories = await findAllCategories()({ categoryRepository });
        res.status(200).json(categories.map(mapCategory));
    }),
);

export default router;
