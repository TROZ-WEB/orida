/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import { categoryRepository } from '../../domain/Category';
import findAllCategories from '../../useCases/categories/findAllCategories';
import asyncRoute from '../../utils/asyncRoute';
import { mapCategory } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json((await findAllCategories()({ categoryRepository })).map(mapCategory));
    }),
);

export default router;
