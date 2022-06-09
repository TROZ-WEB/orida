/* eslint-disable jsx-a11y/aria-role */
import { useEnvironment } from '@contexts/appEnvironment';
import WithTheme, { Theme } from '@customTypes/theme';
import { Button } from '@design/buttons';
import Label from '@design/Label';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import { FileUpload, Panel } from '@uploadcare/react-widget';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const classes = {
    labelDarkTheme: `
    text-white
    `,
};

interface FileInputProps {
    onChange: (group: string[]) => void;
    value?: string[];
}

const FileInput = ({ onChange, value }: FileInputProps) => {
    const env = useEnvironment();
    const { t } = useTranslation();
    const filesModalProps = useModal();

    const handleChange = async (group: FileUpload[]) => {
        const files: string[] = await Promise.all(group.map((g) => g.then((a) => a.cdnUrl)));
        onChange(files);
    };

    return (
        <>
            <Button onClick={filesModalProps.open}>
                {value?.length && value?.length > 0
                    ? `${value?.length} ${t('files_modal_button_files')}`
                    : t('files_modal_button')}
            </Button>
            <Modal classname='max-w-[1000px] p-0 rounded-md' {...filesModalProps}>
                <Panel
                    imageShrink='800x600'
                    locale='fr'
                    multipleMax={4}
                    onChange={handleChange}
                    publicKey={env?.uploadcarePublicKey || ''}
                    tabs='file url facebook gdrive dropbox instagram'
                    value={value}
                    imagesOnly
                    multiple
                    previewStep
                />
                <Button
                    className='absolute z-10 bottom-[20px] right-[20px] text-base py-3 px-4'
                    onClick={filesModalProps.close}
                >
                    {t('files_modal_button_close')}
                </Button>
            </Modal>
        </>
    );
};

interface ControlledFileInputProps extends WithTheme {
    label?: ReactNode;
    name: string;
    control: any;
}

const ControlledFileInput = ({ control, label, name, theme }: ControlledFileInputProps) => {
    return (
        <div className='w-full'>
            {label && (
                <>
                    <Label
                        className={theme === Theme.Dark ? classes.labelDarkTheme : undefined}
                        htmlFor={name}
                    >
                        {label}
                    </Label>
                    <Space px={8} />
                </>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => <FileInput {...field} onChange={field.onChange} />}
            />
        </div>
    );
};

export default ControlledFileInput;
