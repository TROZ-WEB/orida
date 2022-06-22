import { Theme } from '@customTypes/theme';
import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { login, register as authRegister } from '@store/auth/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
};

interface RegisterFormProps {
    redirectTo?: string;
}

const RegisterForm = ({ redirectTo }: RegisterFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const onRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await dispatch(authRegister(data));
            await dispatch(login(data));
            navigate(redirectTo || AppRoutes.Home);
        } catch (e) {
            notify(ToastNotificationType.Error, t('register_error_emailAlreadyInUse'));
        }
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onRegister)}>
            <TextInput
                autoComplete='off'
                label={t('register_firstname_label')}
                name='firstname'
                placeholder='Diana'
                register={register}
                theme={Theme.Dark}
                required
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('register_lastname_label')}
                name='lastname'
                placeholder='Prince'
                register={register}
                theme={Theme.Dark}
                required
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('register_email_label')}
                name='email'
                placeholder='diana@princecorp.com'
                register={register}
                theme={Theme.Dark}
                required
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('register_password_label')}
                name='password'
                register={register}
                theme={Theme.Dark}
                type='password'
                required
            />
            <Space px={62} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('register_submit') as string}
            />
        </form>
    );
};

export default RegisterForm;
