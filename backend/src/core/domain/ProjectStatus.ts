interface ProjectStatus {
    id: string;
    label: string;
}

export const projectStatusSnapshot = (projectStatus: ProjectStatus): ProjectStatus => Object.freeze(projectStatus);

export default ProjectStatus;
