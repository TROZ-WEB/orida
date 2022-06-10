import { Request, Response, Router } from 'express';
import COREPollRepository from '../../core/ports/repositories/COREPollRepository';
import createPoll from '../../core/useCases/polls/createPoll';
import getPollByFormId from '../../core/useCases/polls/getPollByFormId';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

interface PollProps {
    pollRepository: COREPollRepository,
}

const pollRouter = ({
    pollRepository,
}: PollProps): Router => {
    const router = Router();

    interface CreateBodyProps {
        projectId: string;
        question: string;
        responses: string[];
    }

    router.post(
        '/',
        authorizeProjectAdmin(),
        async (req: Request, res: Response) => {
            const { projectId, question, responses } = req.body as CreateBodyProps;
            await createPoll({ projectId, question, responses })({
                pollRepository,
            });

            res.status(200).json({ success: true });
        },
    );

    router.get(
        '/:id',
        async (req: Request, res: Response) => {
            const { id } = req.params;
            const results = await getPollByFormId(id)({ pollRepository });

            res.status(200).json(results);
        },
    );

    // router.post(
    //     '/answer',
    //     async (req: Request, res: Response) => {
    //         const formReponse = req.body.form_response;
    //         const data = {
    //             formId: formReponse.form_id,
    //             userId: formReponse.hidden.userid,
    //         };

    //         // ignore form that does not carry a userid
    //         if (!data.userId) {
    //             res.sendStatus(200);

    //             return;
    //         }

    //         await answerPoll(data)({ pollRepository, pollResponseRepository, userRepository });

    //         res.sendStatus(200);
    //     },
    // );

    return router;
};

export default pollRouter;
