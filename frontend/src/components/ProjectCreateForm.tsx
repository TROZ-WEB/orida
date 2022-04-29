import { SubmitButton } from '@design/buttons';
import {
    DateInput,
    MultiSelectInput,
    NumberInput,
    SelectInput,
    SelectOption,
    TextAreaInput,
    TextInput,
} from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { ProjectStatus } from '@services/projects';
import { getAll as getAllCategories } from '@store/categories/actions';
import { create } from '@store/projects/actions';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    title: string;
    budget: number;
    description: string;
    participatoryBudgetYear: number;
    startDate: Date;
    status: ProjectStatus;
    categories: string[];
};

interface CreateProjectFormProps {
    onCreated: () => void;
}

const CreateProjectForm = ({ onCreated }: CreateProjectFormProps) => {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const [yearsOptions, setYearsOptions] = useState<SelectOption[]>([]);

    const categories = useSelector((state) => state.categories.data);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
    }, []);

    const categoriesOptions = categories.map((category) => {
        return { label: category.label, value: category.id };
    });

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const cleanBudget = data.budget || 0;
            const cleanParticipatoryBudgetYear = data.participatoryBudgetYear || 0;
            const cleanCategories = data.categories || [];
            const cleanData = {
                ...data,
                budget: cleanBudget,
                participatoryBudgetYear: cleanParticipatoryBudgetYear,
                categories: cleanCategories,
            };
            await dispatch(create(cleanData));
            reset();
            onCreated();
        } catch (e: any) {
            notify(NotificationType.Error, e.message);
        }
    };

    const statusOptions: SelectOption[] = [
        { label: t('project_create_status_design'), value: ProjectStatus.Design },
        { label: t('project_create_status_running'), value: ProjectStatus.Running },
        { label: t('project_create_status_complete'), value: ProjectStatus.Complete },
    ];

    const currentYear = new Date().getFullYear();

    useMemo(() => {
        const years: SelectOption[] = [];

        for (let i = 2000; i <= currentYear; i++) {
            years.unshift({ label: i.toString(), value: i.toString() });
        }

        years.unshift({
            label: t('project_create_participatorybudgetyear_placeholder'),
            value: '',
        });
        setYearsOptions(years);
    }, []);

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
            <TextAreaInput
                label={t('project_create_description_label')}
                name='description'
                placeholder={t('project_create_description_placeholder')}
                register={register}
            />
            <Space px={8} />
            <NumberInput
                label={t('project_create_budget_label')}
                name='budget'
                placeholder={t('project_create_budget_placeholder')}
                register={register}
            />
            <Space px={8} />
            <SelectInput
                label={t('project_create_participatorybudgetyear_label')}
                name='participatoryBudgetYear'
                options={yearsOptions}
                register={register}
            />
            <Space px={8} />
            <DateInput
                label={t('project_create_startdate_label')}
                name='startdate'
                register={register}
            />
            <Space px={8} />
            <SelectInput
                label={t('project_create_status_label')}
                name='status'
                options={statusOptions}
                register={register}
            />
            <MultiSelectInput
                label={t('project_create_startdate_categories')}
                name='categories'
                options={categoriesOptions}
                register={register}
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
