import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import Role from '../../domain/Role';
import createPoll from '../../useCases/polls/createPoll';
import asyncRoute from '../../utils/asyncRoute';
import pollAdapter from '../adapters/pollAdapter';
import { pollRepository, postRepository, projectRepository } from '../database';
import authorize from '../middlewares/authorize';

const router = Router();

async function getResponses() {
    const response = await fetch('https://api.typeform.com/forms/D5sLKQEP/responses?page_size=1000', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.TYPEFORM_TOKEN}`,
        },
    });
    const json = await response.json();

    return json;
}

function computeResponses(responses: any[]) {
    const values = responses.map((r) => r.answers[0].choice);
    const results = [
        { label: 'Oui', id: 'Y0SuUSxewVjH', count: values.filter((v) => v.id === 'Y0SuUSxewVjH').length },
        { label: 'Non', id: 'HTipI3XHmfgH', count: values.filter((v) => v.id === 'HTipI3XHmfgH').length },
    ];

    return results;
}

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const responses = await getResponses();

        res.status(200).json({
            total: responses.total_items,
            values: computeResponses(responses.items),
        });
    }),
);

interface CreateBodyProps {
    project: string;
    question: string;
    responses: string[];
}
router.post(
    '/',
    authorize([Role.Manager]),
    asyncRoute(async (req: Request, res: Response) => {
        try {
            const { project, question, responses } = req.body as CreateBodyProps;
            await createPoll({ project, question, responses })({
                pollAdapter,
                pollRepository,
                postRepository,
                projectRepository,
            });

            res.status(200).json({ success: true });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e);
        }
    }),
);

export default router;
