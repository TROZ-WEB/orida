import { Request, Response, Router } from 'express';
import CORECategoryRepository from '../../core/ports/repositories/CORECategoryRepository';
import getAllCategories from '../../core/useCases/category/getAllCategories';
import { mapCategory } from '../../infrastructure/mappers';

interface CategoryRouterProps {
    categoryRepository: CORECategoryRepository,
}

const categoryRouter = ({
    categoryRepository,
}: CategoryRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            const categories = await getAllCategories()({ categoryRepository });
            res.json(categories.map(mapCategory));
        },
    );

    return router;
};

export default categoryRouter;
