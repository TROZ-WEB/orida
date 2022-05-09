import { GlobalActionTypes } from '@store/_global/types';

export interface PollAnswer {
    id: string;
    label: string;
    count: number;
}

const PollAnswerConverter = {
    fromApi(data: any): PollAnswer {
        return {
            id: data.id,
            label: data.label,
            count: data.count,
        };
    },
};

export interface PollResults {
    pollId: string;
    question: string;
    total: number;
    responses: PollAnswer[];
}

export const PollResultsConverter = {
    fromApi(data: any): PollResults {
        return {
            pollId: data.poll.id,
            question: data.question,
            total: data.total,
            responses: data.responses.map((response: any) => PollAnswerConverter.fromApi(response)),
        };
    },
};

export const UPSERT_RESULTS = 'POLLS_UPSERT_RESULTS';

export interface UpsertPollResult {
    type: typeof UPSERT_RESULTS;
    results: PollResults;
}

export type PollActionTypes = GlobalActionTypes | UpsertPollResult;

export interface PollState {
    results: PollResults[];
}

export const initialState: PollState = {
    results: [],
};
