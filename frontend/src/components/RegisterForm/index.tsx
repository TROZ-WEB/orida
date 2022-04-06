import './style.scss';

import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import { register as authRegister } from '@store/auth/actions';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    email: string;
    password: string;
};

function RegisterForm() {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const onRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await dispatch(authRegister(data));
            navigate(AppRoutes.Home);
        } catch (e) {
            // temporary error handling
            // eslint-disable-next-line
            window.alert(e);
        }
    };

    return (
        <form className="register-form__form" onSubmit={handleSubmit(onRegister)}>
            <TextInput
                label={t('login_email_label')}
                name="email"
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('login_password_label')}
                name="password"
                register={register}
                type="password"
            />
            <Space px={12} />
            <SubmitButton value={t('login_submit') as string} />
        </form>
    );
}

export default RegisterForm;
