import UserType from '@customTypes/userType';
import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import ToggleText from '@design/inputs/ToggleText';
import Space from '@design/Space';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import notify, { NotificationType } from '@services/notifications';
import { register as authRegister } from '@store/auth/actions';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    email: string;
    password: string;
    type: boolean;
};

function RegisterForm() {
    const { control, register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const onRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const typedData = {
                email: data.email,
                password: data.password,
                type: data.type ? UserType.Citizen : UserType.Community,
            };
            await dispatch(authRegister(typedData));
            navigate(AppRoutes.Home);
        } catch (e) {
            notify(NotificationType.Error, t('register_error_emailAlreadyInUse'));
        }
    };

    return (
        <form className="max-w-[500px]" onSubmit={handleSubmit(onRegister)}>
            <ToggleText
                control={control}
                falseText={t('type_userType_community')}
                label={t('register_type_label')}
                labelClassName='text-white'
                name="type"
                trueText={t('type_userType_citizen')}
                defaultValue
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('login_email_label')}
                labelClassNames="text-white"
                name="email"
                placeholder="bruce@wayneenterprise.com"
                register={register}
                required
            />
            <Space px={24} />
            <TextInput
                autoComplete='off'
                label={t('login_password_label')}
                labelClassNames="text-white"
                name="password"
                register={register}
                type="password"
                required
            />
            <Space px={62} />
            <SubmitButton className="bg-secondary hover:bg-secondary-hover" value={t('register_submit') as string} />
        </form>
    );
}

export default RegisterForm;
