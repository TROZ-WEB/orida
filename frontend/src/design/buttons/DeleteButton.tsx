import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';

import Button, { ButtonProps } from './Button';

const classes = {
    deleteButton: 'bg-error',
};

const DeleteButton = ({ className, ...props }: ButtonProps) => {
    const { t } = useTranslation();

    return (
        <Button className={classnames(classes.deleteButton, className)} {...props}>
            {t('button_delete')}
        </Button>
    );
};

export default DeleteButton;
