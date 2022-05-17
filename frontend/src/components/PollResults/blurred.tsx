import classnames from '@utils/classnames';

import { classes } from '.';
import PollResultsRow from './PollResponseRow';

const PollResultsBlurred = () => (
    <div className={classnames(classes.card, 'blur-sm')}>
        <span className={classes.question}>Où placer la statue de dinosaure ?</span>
        <div>
            <PollResultsRow key='123' className='mb-3' label='Rue nationale' value={50} />
            <PollResultsRow key='456' className='mb-3' label='Avenue de Gaulle' value={30} />
            <PollResultsRow key='789' className='mb-3' label='Square Martin' value={20} />
        </div>
    </div>
);

export default PollResultsBlurred;
