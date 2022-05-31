/* eslint-disable jsx-a11y/aria-role */
import { useEnvironment } from '@contexts/appEnvironment';
import WithTheme, { Theme } from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import { FilesUpload, Widget } from '@uploadcare/react-widget';
import { InputHTMLAttributes, ReactNode } from 'react';
import { Controller } from 'react-hook-form';

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement>, WithTheme {
    label?: ReactNode;
    name: string;
    handleChange: (files: any) => void;
    control: any;
}

const classes = {
    labelDarkTheme: `
    text-white
    `,
};

const FileInput = ({ control, label, name, theme = Theme.Light, handleChange }: FileInputProps) => {
    const env = useEnvironment();

    const handleFileSelect = async (group: FilesUpload | null) => {
        if (group) {
            const files = await Promise.all(group.files());
            handleChange(files.map((file) => file.cdnUrl));
        }
    };

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
                render={() => (
                    <Widget
                        imageShrink='800x600'
                        locale='fr'
                        multipleMax={4}
                        onFileSelect={(group) => handleFileSelect(group as FilesUpload | null)}
                        publicKey={env?.uploadcarePublicKey || ''}
                        tabs='file url facebook gdrive dropbox instagram'
                        imagesOnly
                        multiple
                        previewStep
                    />
                )}
            />
        </div>
    );
};

export default FileInput;
