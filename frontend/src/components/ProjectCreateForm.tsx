import Option from '@customTypes/Option';
import Position from '@customTypes/position';
import { SubmitButton } from '@design/buttons';
import {
    DateInput,
    LocationInput,
    MultiSelectInput,
    NumberInput,
    SelectInput,
    TextAreaInput,
    TextInput,
} from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { Organization } from '@services/organizations/types';
import { Status } from '@services/status';
import { getAll as getAllCategories } from '@store/categories/actions';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { create } from '@store/projects/actions';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    budget: number;
    categories: string[];
    description: string;
    location: Position;
    organizations: string[];
    participatoryBudgetYear: number;
    startDate: Date;
    status: Status;
    title: string;
};

interface CreateProjectFormProps {
    projectStatuses: Status[];
    onCreated: () => void;
}

const CreateProjectForm = ({ projectStatuses, onCreated }: CreateProjectFormProps) => {
    const { control, register, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const [yearsOptions, setYearsOptions] = useState<Option[]>([]);

    const categories = useSelector((state) => state.categories.data);
    const statusesOptions = projectStatuses.map((status) => ({
        value: status.id,
        label: status.label,
    }));
    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
        if (organizations.length === 0) {
            dispatch(getAllOrganizations());
        }
    }, []);

    const categoriesOptions = categories.map((category) => {
        return { label: category.label, value: category.id };
    });

    const organizationsOptions = organizations.map((organization: Organization) => {
        return { label: organization.name, value: organization.id };
    });

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const cleanBudget = data.budget || 0;
            const cleanParticipatoryBudgetYear = data.participatoryBudgetYear || 0;
            const cleanCategories = data.categories || [];
            const cleanOrganizations = data.organizations || [];
            await dispatch(
                create({
                    ...data,
                    budget: cleanBudget,
                    participatoryBudgetYear: cleanParticipatoryBudgetYear,
                    categories: cleanCategories,
                    statusId: data.status.id,
                    organizations: cleanOrganizations,
                })
            );
            reset();
            onCreated();
        } catch (e: any) {
            notify(NotificationType.Error, e.message);
        }
    };

    const currentYear = new Date().getFullYear();

    useMemo(() => {
        const years: Option[] = [];

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
            <LocationInput control={control} label='Location' name='location' />
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
                options={statusesOptions}
                register={register}
            />
            <MultiSelectInput
                label={t('project_create_startdate_label')}
                name='categories'
                options={categoriesOptions}
                register={register}
            />
            <MultiSelectInput
                label={t('project_create_organizations_label')}
                name='organizations'
                options={organizationsOptions}
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
