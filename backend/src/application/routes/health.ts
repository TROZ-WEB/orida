import { Request, Response, Router } from 'express';

const healthRouter = (): Router => {
    const router = Router();

    router.get('/', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    return router;
};

export default healthRouter;
