import PollBlurred from '@components/Poll/blurred';
import PollResultsBlurred from '@components/PollResults/blurred';
import Carousel from '@design/Carousel';
import { H1 } from '@design/titles';
import UnauthenticatedCTA from '@design/UnauthenticatedCTA';
import { useTranslation } from 'react-i18next';

const classes = {
    blurred: 'blur-sm',
    carousel: 'relative w-full',
    title: 'flex justify-between mb-6',
    wrapper: 'p-16 relative',
};

const PollSectionBlurred = () => {
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <div className={classes.blurred}>
                <div className={classes.title}>
                    <H1>{t('project_polls_title')} (3)</H1>
                </div>
                <div className={classes.carousel}>
                    <Carousel>
                        <div className='pl-0 pr-2 h-full'>
                            <PollBlurred />
                        </div>
                        <div className='pl-2 pr-2 h-full'>
                            <PollResultsBlurred />
                        </div>
                        <div className='pl-2 pr-0 h-full'>
                            <PollResultsBlurred />
                        </div>
                    </Carousel>
                </div>
            </div>
            <UnauthenticatedCTA className='absolute inset-0 h-full w-full ' />
        </div>
    );
};

export default PollSectionBlurred;
