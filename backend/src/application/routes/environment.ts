import { Request, Response, Router } from 'express';
import { mapEnvironment } from '../../infrastructure/mappers';

const environmentRouter = (): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            res.status(200).json(mapEnvironment(process.env));
        },
    );

    return router;
};

export default environmentRouter;
