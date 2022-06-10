/* eslint-disable max-len */
import ProjectDomain from '../../domain/Project';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';

export interface Arg {
    id:string;
    images: string[];
}

interface Context {
    projectRepository: COREProjectRepository;
}

const createProjectImages = ({
    id,
    images,
}: Arg) => (
    async ({ projectRepository }: Context): Promise<ProjectDomain> => {
        const project = await projectRepository.createProjectImages({ id, images });

        return project;
    }
);

export default createProjectImages;
