import CategoryDomain from '../../domain/Category';
import ProjectDomain from '../../domain/Project';
import UserDomain from '../../domain/User';
import Budget from '../../types/Budget';
import Position from '../../types/Position';

interface createProjectProps {
    auth: UserDomain;
    budget?: Number;
    categories: CategoryDomain[];
    description?: string;
    organizations: string[];
    participatoryBudgetYear?: Number;
    location: Position;
    images?: string[];
    startDate?: Date;
    statusId: string;
    title: string;
}

interface updateProjectProps {
    id:string;
    budget?: Number;
    categories: CategoryDomain[];
    description?: string;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    statusId: string;
    title: string;
    location: Position;
}

interface createProjectImagesProps {
    id:string;
    images: string[];
}

interface getProjectBySearchProps {
    search?: string;
    status?: string[]; // id only
    categories?: string[]; // id only
    budgets?: Budget[];
}

interface COREProjectRepository {
    createProject(projectData: createProjectProps): Promise<ProjectDomain>;
    createProjectImages(imagesData: createProjectImagesProps): Promise<ProjectDomain>;
    getAllProjects(): Promise<ProjectDomain[]>;
    getProjectById(id: string): Promise<ProjectDomain | undefined>;
    getProjectBySearch(search: getProjectBySearchProps): Promise<ProjectDomain[]>;
    updateProject(projectData: updateProjectProps): Promise<ProjectDomain>;
}

export default COREProjectRepository;
