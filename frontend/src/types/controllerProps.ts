import { Control, FieldName, FieldValues, RegisterOptions } from 'react-hook-form';

interface ControllerProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldName<TFieldValues>;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    onFocus?: () => void;
    defaultValue?: unknown;
    control?: Control<TFieldValues>;
}

export default ControllerProps;
