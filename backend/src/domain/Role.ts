/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
class Role {
    id: string;

    label: string;

    constructor(
        id: string,
        label: string,
    ) {
        this.id = id;
        this.label = label;
    }
}

export { Role };
