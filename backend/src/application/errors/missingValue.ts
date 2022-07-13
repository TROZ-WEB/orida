export default class MissingValue extends Error {
    name = 'MissingValue';

    constructor(valueName: string) {
        super();
        this.message = `Missing value ${valueName}`;
    }
}
