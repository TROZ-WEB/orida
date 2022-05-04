import { POST } from '../../../utils/http';

interface PollAdapterCreateProps {
    question: string;
    responses: string[];
}

interface PollAdapterCreateResponse {
    id: string;
}

export interface PollAdapterType {
    create: (props: PollAdapterCreateProps) => Promise<string>,
}

const PollAdapter: PollAdapterType = {
    async create({ question, responses }: PollAdapterCreateProps) {
        const body = {
            title: question,
            type: 'form',
            fields: [
                {
                    properties: {
                        allow_multiple_selection: false,
                        allow_other_choice: false,
                        choices: responses.map((response, index) => ({
                            label: response,
                            ref: `response_${index}`,
                        })),
                        description: '',
                        randomize: false,
                        vertical_alignment: false,
                    },
                    ref: 'question_1',
                    title: question,
                    type: 'multiple_choice',
                    validations: {
                        required: true,
                    },
                },
            ],
            workspace: {
                href: 'https://api.typeform.com/workspaces/UG6YAd',
            },
            settings: {
                // redirect_after_submit_url
            },
        };

        const response = await POST<PollAdapterCreateResponse>('https://api.typeform.com/forms', {
            body,
            headers: {
                Authorization: `Bearer ${process.env.TYPEFORM_TOKEN}`,
            },
        });

        return response.id;
    },
};

export default PollAdapter;
