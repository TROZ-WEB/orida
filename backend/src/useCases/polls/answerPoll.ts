import { Repository } from 'typeorm';
import { Poll as PollEntity } from '../../infrastructure/database/entities/Poll';
import { PollResponse as PollResponseEntity } from '../../infrastructure/database/entities/PollResponse';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import findOneById from '../users/findOneById';
import UserError, { UserErrorType } from '../users/UserError';
import findOneByFormId from './findOneByFormId';
import PollError, { PollErrorType } from './PollError';

interface Arg {
    formId: string;
    userId: string;
}

interface Context {
    pollRepository: Repository<PollEntity>;
    pollResponseRepository: Repository<PollResponseEntity>;
    userRepository: Repository<UserEntity>;
}

const answerPoll = ({
    formId,
    userId,
}: Arg) => async ({
    pollRepository,
    pollResponseRepository,
    userRepository,
}: Context): Promise<boolean> => {
    const userData = await findOneById(userId)({ userRepository });
    const pollData = await findOneByFormId(formId)({ pollRepository });

    if (!userData) {
        throw new UserError(UserErrorType.NotFound);
    }
    if (!pollData) {
        throw new PollError(PollErrorType.NotFound);
    }

    const created = await pollResponseRepository.create({
        poll: pollData,
        user: userData,
    });
    await pollResponseRepository.save(created);

    return true;
};

export default answerPoll;
