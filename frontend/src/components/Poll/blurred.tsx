import { Button } from '@design/buttons';

const classes = {
    card: 'bg-white rounded-lg p-5 pb-3 h-full flex flex-col justify-between blur-sm',
    question: 'text-lg text-primary-dark leading-6 mb-4 block min-h-[48px]',
    answer: 'w-fit bg-primary-transparent mb-2 border-2 border-primary text-primary',
    submit: 'w-full mt-3',
};

const PollBlurred = () => {
    return (
        <div className={classes.card}>
            <span className={classes.question}>
                Quel jeu préférez-vous pour le prochain jardin de la Paix ?
            </span>
            <div>
                <Button className={classes.answer}>Une balançoire</Button>
                <Button className={classes.answer}>Un toboggan</Button>
                <Button className={classes.answer}>Un jeu à ressort</Button>
                <Button className={classes.submit} onClick={() => {}}>
                    Répondre
                </Button>
            </div>
        </div>
    );
};

export default PollBlurred;
