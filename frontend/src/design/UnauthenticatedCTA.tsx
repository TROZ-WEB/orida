import { goToLogin, LoginTab } from '@router/AppRoutes';
import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { ButtonLink } from './buttons';
import { H3 } from './titles';

const classes = {
    cta: 'flex flex-col items-center justify-center',
};

interface Props {
    className?: string;
}

const UnauthenticatedCTA = ({ className }: Props) => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    return (
        <div className={classnames(className, classes.cta)}>
            <H3 className='mb-2'>{t('CTA_phrase')}</H3>
            <ButtonLink className='w-fit' to={goToLogin(LoginTab.Register, pathname)}>
                {t('CTA_button')}
            </ButtonLink>
        </div>
    );
};

export default UnauthenticatedCTA;
