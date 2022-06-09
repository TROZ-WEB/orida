/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { imageRepository } from '../../infrastructure/database';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import ProjectError, { ProjectErrorType } from './projectError';

export interface AddProjectImagesProps {
    id:string;
    images: string[];
}

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

const addProjectImages = ({
    id,
    images,
}: AddProjectImagesProps) => (
    async ({ projectRepository }: Context): Promise<Project> => {
        const existingProject = await projectRepository.findOneBy({ id });

        if (!existingProject) {
            throw new ProjectError(ProjectErrorType.NotFound);
        }

        if (images && images?.length > 0) {
            const imagesArray = images.map((url) => ({ project: existingProject, url }));

            await imageRepository.save(imagesArray);
        }

        return existingProject.toDomain();
    }
);

export default addProjectImages;
