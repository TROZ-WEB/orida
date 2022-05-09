import { Repository } from 'typeorm';
import { PollResults } from '../../domain/PollResults';
import { PollAdapterType } from '../../infrastructure/adapters/pollAdapter';
import { Poll as PollEntity } from '../../infrastructure/database/entities/Poll';
import PollError, { PollErrorType } from './PollError';

interface Context {
    pollAdapter: PollAdapterType;
    pollRepository: Repository<PollEntity>;
}

const getResults = (pollId: string) => async ({ pollAdapter, pollRepository }: Context): Promise<PollResults> => {
    const pollEntity = await pollRepository.findOne({
        where: { id: pollId },
    });

    if (!pollEntity) {
        throw new PollError(PollErrorType.NotFound);
    }

    const { externalPollId } = pollEntity;
    const results = await pollAdapter.getResults(externalPollId);
    const finalResult = results.choices.map((choice) => ({
        id: choice.id,
        count: 0,
        label: choice.label,
    }));
    const sortedAnswers = results.responses.reduce((all, current) => {
        const allCopy = [...all];
        const choiceIndex = allCopy.findIndex((existing) => existing.id === current.id);
        allCopy[choiceIndex].count++;

        return allCopy;
    }, finalResult);

    return new PollResults(
        pollEntity.toDomain(),
        results.question,
        results.total,
        sortedAnswers,
    );
};

export default getResults;
