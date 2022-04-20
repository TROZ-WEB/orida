import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { create } from '@store/projects/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    title: string;
};

const CreateProjectForm = () => {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await dispatch(create(data));
            reset();
        } catch (e) {
            notify(NotificationType.Error, 'non');
        }
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
            <TextInput
                label={t('project_create_title_label')}
                name='title'
                placeholder={t('project_create_title_placeholder')}
                register={register}
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('project_create_button') as string}
            />
        </form>
    );
};

export default CreateProjectForm;
