import UserDomain from '../../core/domain/User';
import COREUserRepository from '../../core/ports/repositories/COREUserRepository';
import UserEntity from '../database/entities/User.entity';

const createUser: COREUserRepository['createUser'] = async ({
    firstname,
    lastname,
    email,
    password,
}): Promise<UserDomain> => {
    const user = UserEntity.create({
        firstname,
        lastname,
        email,
        isAdmin: false,
        fullname: `${firstname} ${lastname}`,
    });
    await user.updatePassword(password);

    const saved = await UserEntity.save(user);

    return saved.toDomain();
};

const getAllUsers: COREUserRepository['getAllUsers'] = async (): Promise<UserDomain[]> => {
    const users = await UserEntity.find({
        order: {
            email: 'ASC',
        },
    });

    return users.map((user) => user.toDomain());
};

const getUserById: COREUserRepository['getUserById'] = async (id): Promise<UserDomain | undefined> => {
    const user = await UserEntity.findOne({
        where: { id },
        relations: {
            organizations: {
                organization: {
                    projects: true,
                },
            },
            projects: {
                project: {
                    status: true,
                },
            },
        },
    });

    return user ? user.toDomain() : undefined;
};

const getUserByEmail: COREUserRepository['getUserByEmail'] = async (email): Promise<UserDomain | undefined> => {
    const user = await UserEntity.findOne({
        where: { email },
        relations: {
            organizations: {
                organization: {
                    projects: true,
                },
            },
            projects: {
                project: {
                    status: true,
                },
            },
        },
    });

    return user ? user.toDomain() : undefined;
};

export default { createUser, getAllUsers, getUserById, getUserByEmail };
