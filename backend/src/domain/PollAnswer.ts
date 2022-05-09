class PollAnswer {
    id: string;

    label: string;

    count: number;

    constructor(id: string, label: string, count: number) {
        this.id = id;
        this.count = count;
        this.label = label;
    }
}

export default PollAnswer;
