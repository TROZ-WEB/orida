import { ReduxDispatch } from '@hooks/useThunkDispatch';
import PollService from '@services/polls';

import { PollActionTypes, PollResults, PollResultsConverter, UPSERT_RESULTS } from './types';

export const addPollResult = (results: PollResults): PollActionTypes => ({
    type: UPSERT_RESULTS,
    results,
});

export const getResult =
    (pollId: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await PollService.getResults(pollId);
        dispatch(addPollResult(PollResultsConverter.fromApi(result)));
    };
