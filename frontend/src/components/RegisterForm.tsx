import { Theme } from '@customTypes/theme';
import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import notify, { NotificationType } from '@services/notifications';
import { register as authRegister } from '@store/auth/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    email: string;
    password: string;
};

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const onRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const typedData = {
                email: data.email,
                password: data.password,
            };
            await dispatch(authRegister(typedData));
            navigate(AppRoutes.Home);
        } catch (e) {
            notify(NotificationType.Error, t('register_error_emailAlreadyInUse'));
        }
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onRegister)}>
            <TextInput
                autoComplete='off'
                label={t('login_email_label')}
                name='email'
                placeholder='bruce@wayneenterprise.com'
                register={register}
                theme={Theme.Dark}
                required
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('login_password_label')}
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
