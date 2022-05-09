import { POST, PUT } from '../../../utils/http';

interface PollAdapterCreateProps {
    question: string;
    responses: string[];
}

interface PollAdapterCreateResponse {
    id: string;
}

export interface PollAdapterType {
    create: (props: PollAdapterCreateProps) => Promise<string>;
    createAnswerWebhook: (pollId: string) => Promise<boolean>;
    getHeaders: () => Record<string, string>;
}

const PollAdapter: PollAdapterType = {
    getHeaders() {
        return {
            Authorization: `Bearer ${process.env.TYPEFORM_TOKEN}`,
        };
    },

    async create({ question, responses }: PollAdapterCreateProps) {
        const body = {
            title: question,
            type: 'form',
            hidden: ['userid'],
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
                        vertical_alignment: true,
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
            thankyou_screens: [
                {
                    properties: {
                        show_button: false,
                        share_icons: false,
                    },
                    title: "Merci d'avoir participé !",
                },
            ],
        };

        const response = await POST<PollAdapterCreateResponse>('https://api.typeform.com/forms', {
            body,
            headers: this.getHeaders(),
        });

        return response.id;
    },

    async createAnswerWebhook(pollId: string): Promise<boolean> {
        const body = {
            enabled: true,
            url: process.env.TYPEFORM_ANSWER_WEBHOOK,
        };

        await PUT<any>(`https://api.typeform.com/forms/${pollId}/webhooks/answer`, {
            body,
            headers: this.getHeaders(),
        });

        return true;
    },
};

export default PollAdapter;
