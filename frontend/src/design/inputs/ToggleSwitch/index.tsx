/* SOURCE: https://www.sitepoint.   com/react-toggle-switch-reusable-component/ */
import './style.scss';

import React from 'react';

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function. The props name, small, disabled
and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

interface ToggleSwitchProps {
    checked: boolean;
    disabled?: boolean;
    id: string;
    name: string;
    onChange: (newValue: boolean) => void;
    optionLabels: [string, string];
    small: boolean;
}

const ToggleSwitch = ({
    checked = false,
    disabled = false,
    id,
    name,
    onChange,
    optionLabels,
    small = false,
}: ToggleSwitchProps) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (e.keyCode !== 32) return;

        e.preventDefault();
        onChange(!checked);
    };

    return (
        <div className={`toggle-switch${small ? ' small-switch' : ''}`}>
            <input
                checked={checked}
                className='toggle-switch-checkbox'
                disabled={disabled}
                id={id}
                name={name}
                onChange={(e) => onChange(e.target.checked)}
                type='checkbox'
            />
            <label
                className='toggle-switch-label'
                htmlFor={id}
                onKeyDown={(e) => handleKeyPress(e)}
                role='presentation'
                tabIndex={disabled ? -1 : 1}
            >
                <span
                    className={
                        disabled
                            ? 'toggle-switch-inner toggle-switch-disabled'
                            : 'toggle-switch-inner'
                    }
                    data-no={optionLabels[1]}
                    data-yes={optionLabels[0]}
                    tabIndex={-1}
                />
                <span
                    className={
                        disabled
                            ? 'toggle-switch-switch toggle-switch-disabled'
                            : 'toggle-switch-switch'
                    }
                    tabIndex={-1}
                />
            </label>
        </div>
    );
};

export default ToggleSwitch;
