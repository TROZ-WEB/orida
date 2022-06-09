import Option from '@customTypes/Option';
import Position from '@customTypes/position';
import { SubmitButton } from '@design/buttons';
import {
    DateInput,
    FileInput,
    LocationInput,
    MultiSelectInput,
    NumberInput,
    SelectInput,
    TextAreaInput,
    TextInput,
} from '@design/inputs';
import Space from '@design/Space';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { Project } from '@services/projects';
import { getAuth } from '@store/auth/actions';
import { getAll as getAllCategories } from '@store/categories/actions';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { create, update } from '@store/projects/actions';
import { getAll as getAllStatus } from '@store/status/actions';
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
    startDate: string;
    status: string;
    title: string;
    images: string[];
};

interface ProjectFormProps {
    onCreated: () => void;
    project?: Project;
}

enum FormMode {
    Create = 'CREATE',
    Update = 'UPDATE',
}

const ProjectForm = ({ onCreated, project }: ProjectFormProps) => {
    const { control, register, handleSubmit, reset } = useForm<Inputs>({
        defaultValues: {
            title: project?.title,
            description: project?.description,
            budget: project?.budget,
            participatoryBudgetYear: project?.participatoryBudgetYear,
            startDate: project?.startDate?.toString().slice(0, 10),
            status: project?.status?.id,
            categories: project?.categories?.map((c) => c.id),
            location: project?.location,
        },
    });
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const { isAdmin } = useRole();
    const mode = project ? FormMode.Update : FormMode.Create;

    // Years options
    const [yearsOptions, setYearsOptions] = useState<Option[]>([]);
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

    // Statuses options
    const projectStatuses = useSelector((state) => state.status.data);
    const statusesOptions = projectStatuses.map((status) => ({
        value: status.id,
        label: status.label,
    }));

    // Categories options
    const categories = useSelector((state) => state.categories.data);
    const categoriesOptions = categories.map((category) => {
        return { label: category.label, value: category.id };
    });

    // Admin organizations options
    const adminOrganizationOptions = useSelector((state) => state.organizations.data).map(
        (organization) => {
            return {
                label: organization.name,
                value: organization.id,
            };
        }
    );
    // Organizations options
    const auth = useSelector((state) => state.auth.data);
    const organizationsOptions = auth.organizationMemberships.map((organizationMembership) => {
        return {
            label: organizationMembership.organization.name,
            value: organizationMembership.organization.id,
        };
    });

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
        dispatch(getAllStatus());
        dispatch(getAllOrganizations());
        dispatch(getAuth());
    }, []);

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const cleanBudget = data.budget || 0;
            const cleanStartDate = data.startDate ? new Date(data.startDate) : undefined;
            const cleanParticipatoryBudgetYear = data.participatoryBudgetYear || 0;
            const cleanCategories = data.categories || [];
            const cleanOrganizations =
                organizationsOptions.length === 1
                    ? [organizationsOptions[0].value]
                    : data.organizations;
            await dispatch(
                create({
                    ...data,
                    budget: cleanBudget,
                    startDate: cleanStartDate,
                    participatoryBudgetYear: cleanParticipatoryBudgetYear,
                    categories: cleanCategories,
                    statusId: data.status,
                    organizations: cleanOrganizations,
                })
            );
            dispatch(getAuth());
            reset();
            onCreated();
        } catch (e: any) {
            notify(NotificationType.Error, e.message);
        }
    };

    const onUpdate: SubmitHandler<Inputs> = async (data: Inputs) => {
        if (project) {
            try {
                const cleanBudget = data.budget || 0;
                const cleanStartDate = data.startDate ? new Date(data.startDate) : undefined;
                const cleanParticipatoryBudgetYear = data.participatoryBudgetYear || 0;
                let cleanCategories = data.categories || [];
                if (typeof cleanCategories === 'string') cleanCategories = [cleanCategories];
                await dispatch(
                    update({
                        project: project.id,
                        description: data.description,
                        startDate: cleanStartDate,
                        title: data.title,
                        id: project.id,
                        statusId: data.status,
                        location: data.location,
                        budget: cleanBudget,
                        participatoryBudgetYear: cleanParticipatoryBudgetYear,
                        categories: cleanCategories,
                    })
                );
                reset();
                onCreated();
            } catch (e: any) {
                notify(NotificationType.Error, e.message);
            }
        }
    };

    const onSubmit: SubmitHandler<Inputs> = mode === FormMode.Create ? onCreate : onUpdate;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label={t('project_create_title_label')}
                name='title'
                placeholder={t('project_create_title_placeholder')}
                register={register}
                required
            />
            <Space px={8} />
            {mode === FormMode.Create && (
                <>
                    <FileInput
                        control={control}
                        label={t('project_create_images_label')}
                        name='images'
                    />
                    <Space px={8} />
                </>
            )}
            <LocationInput
                control={control}
                defaultValue={project?.location}
                label='Location'
                name='location'
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
                defaultValue={project?.startDate?.toString().slice(0, 10)}
                label={t('project_create_startdate_label')}
                name='startDate'
                register={register}
            />
            <Space px={8} />
            <SelectInput
                label={t('project_create_status_label')}
                name='status'
                options={statusesOptions}
                register={register}
            />
            <Space px={8} />
            <MultiSelectInput
                defaultValue={project?.categories?.map((c) => c.id)}
                label={t('project_create_startdate_label')}
                name='categories'
                options={categoriesOptions}
                register={register}
            />
            <Space px={8} />
            {mode === FormMode.Create && isAdmin && (
                <MultiSelectInput
                    label={t('project_create_organizations_label')}
                    name='organizations'
                    options={adminOrganizationOptions}
                    register={register}
                    required
                />
            )}
            {mode === FormMode.Create && organizationsOptions.length > 1 && (
                <MultiSelectInput
                    label={t('project_create_organizations_label')}
                    name='organizations'
                    options={organizationsOptions}
                    register={register}
                    required
                />
            )}
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={
                    mode === FormMode.Create
                        ? t('project_create_button')
                        : t('project_update_button')
                }
            />
        </form>
    );
};

export default ProjectForm;
