import ProjectDomain, { Budget } from '../../domain/Project';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';

interface Context {
    projectRepository: COREProjectRepository;
}

interface Arg {
    search?: string;
    status?: string[]; // id only
    categories?: string[]; // id only
    budgets?: Budget[];
}

/* general search among projects by a string on a subselection of fields */
const getProjectsBySearch = ({ search, status, categories, budgets }: Arg) => (
    async ({ projectRepository }: Context): Promise<ProjectDomain[]> => {
        const projects = await projectRepository.getProjectBySearch({
            search,
            status,
            categories,
            budgets,
        });

        return projects;
    }
);

export default getProjectsBySearch;
