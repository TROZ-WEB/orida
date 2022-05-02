/* eslint-disable import/prefer-default-export */
interface ProjectStatusConstructorProps {
    id: string;
    label: string;
}

class ProjectStatus {
    id: string;

    label: string;

    constructor({
        id,
        label,
    }: ProjectStatusConstructorProps) {
        this.id = id;
        this.label = label;
    }
}

export { ProjectStatus };
