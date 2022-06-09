import { useEnvironment } from '@contexts/appEnvironment';
import WithTheme from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import { Editor } from '@tinymce/tinymce-react';
import { ReactNode, useRef } from 'react';
import { Controller } from 'react-hook-form';

interface RichTextEditorInputProps extends WithTheme {
    onChange: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    value: string;
}
const RichTextEditorInput = ({
    onChange,
    defaultValue,
    placeholder,
    value,
}: RichTextEditorInputProps) => {
    const env = useEnvironment();
    const handleChange = (text: string) => {
        onChange(text);
    };

    const editorRef = useRef<any | null>(null);

    return (
        <Editor
            apiKey={env?.tinyMCEKey || ''}
            init={{
                placeholder,
                height: 300,
                menubar: false,
                language: 'fr_FR',
                plugins: [
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'searchreplace',
                    'visualblocks',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'help',
                    'emoticons',
                ],
                toolbar: 'link | bold italic | bullist numlist | emoticons | help',
                content_style: 'body { font-family:Lato,Arial,sans-serif; font-size:14px }',
            }}
            initialValue={defaultValue}
            onEditorChange={handleChange}
            // eslint-disable-next-line no-return-assign
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={value}
        />
    );
};

interface ControlledRichTextEditorInputProps {
    label?: ReactNode;
    name: string;
    control: any;
    required?: boolean;
    defaultValue?: string;
    placeholder?: string;
}

const ControlledRichTextEditorInput = ({
    control,
    label,
    name,
    required = false,
    defaultValue,
    placeholder,
}: ControlledRichTextEditorInputProps) => {
    return (
        <div>
            <Label>{label}</Label>
            <Space px={8} />
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <RichTextEditorInput
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        {...field}
                    />
                )}
                rules={{ required }}
            />
        </div>
    );
};

export default ControlledRichTextEditorInput;
