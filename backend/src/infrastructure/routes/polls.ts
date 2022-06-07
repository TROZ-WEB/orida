import { Request, Response, Router } from 'express';
import answerPoll from '../../useCases/polls/answerPoll';
import createPoll from '../../useCases/polls/createPoll';
import getResults from '../../useCases/polls/getResults';
import pollAdapter from '../adapters/pollAdapter';
import { pollRepository, pollResponseRepository, postRepository, projectRepository, userRepository } from '../database';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

const router = Router();

interface CreateBodyProps {
    project: string;
    question: string;
    responses: string[];
}
router.post(
    '/',
    authorizeProjectAdmin(),
    async (req: Request, res: Response) => {
        const { project, question, responses } = req.body as CreateBodyProps;
        await createPoll({ project, question, responses })({
            pollAdapter,
            pollRepository,
            postRepository,
            projectRepository,
        });

        res.status(200).json({ success: true });
    },
);

router.get(
    '/:id/results',
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const results = await getResults(id)({ pollAdapter, pollRepository });

        res.status(200).json(results);
    },
);

router.post(
    '/answer',
    async (req: Request, res: Response) => {
        const formReponse = req.body.form_response;
        const data = {
            formId: formReponse.form_id,
            userId: formReponse.hidden.userid,
        };

        // ignore form that does not carry a userid
        if (!data.userId) {
            res.sendStatus(200);

            return;
        }

        await answerPoll(data)({ pollRepository, pollResponseRepository, userRepository });

        res.sendStatus(200);
    },
);

export default router;
