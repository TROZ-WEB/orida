import PollBlurred from '@components/Poll/blurred';
import PollResultsBlurred from '@components/PollResults/blurred';
import { ButtonLink } from '@design/buttons';
import Carousel from '@design/Carousel';
import { H1, H3 } from '@design/titles';
import { goToLogin, LoginTab } from '@router/AppRoutes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const classes = {
    blurred: 'blur-sm',
    carousel: 'relative w-full',
    cta: 'absolute inset-0 h-full w-full flex flex-col items-center justify-center',
    title: 'flex justify-between mb-6',
    wrapper: 'p-16 relative',
};

const PollSectionBlurred = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();

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
            <div className={classes.cta}>
                <H3 className='mb-2'>{t('project_polls_blurred_phrase')}</H3>
                <ButtonLink className='w-fit' to={goToLogin(LoginTab.Register, pathname)}>
                    {t('project_polls_blurred_button')}
                </ButtonLink>
            </div>
        </div>
    );
};

export default PollSectionBlurred;
