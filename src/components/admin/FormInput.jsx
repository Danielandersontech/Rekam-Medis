// components/admin/FormInput.jsx
import React from 'react';

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    options = [],
    className = '',
    ...props
}) => {
    const inputClass = `input input-bordered w-full ${error ? 'input-error' : ''} ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`;

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
                    required={required}
                    disabled={disabled}
                    {...props}
                >
                    <option value="">Pilih {label}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        } else if (type === 'textarea') {
            return (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`textarea textarea-bordered w-full ${error ? 'textarea-error' : ''}`}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
            );
        } else {
            return (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
            );
        }
    };

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} {required && <span className="text-error">*</span>}
                </span>
            </label>
            {renderInput()}
            {error && <span className="text-xs text-error mt-1">{error}</span>}
        </div>
    );
};

export default FormInput;