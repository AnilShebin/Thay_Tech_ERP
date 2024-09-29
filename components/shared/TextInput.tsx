import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  isSelect?: boolean;
  disabled?: boolean;
  options?: string[];
  error?: string;
  value?: string | number; // Optional prop for controlled inputs
  defaultValue?: string | number; // Optional prop for uncontrolled inputs
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Add onChange prop
  name?: string; // Add name prop for form handling
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = 'text',
  isSelect = false,
  disabled = false,
  options = [],
  error,
  value, // Destructured here
  defaultValue, // Destructured here
  onChange, // Destructured here
  name, // Destructured here
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {isSelect ? (
        <select
          name={name} // Attach name prop
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
          disabled={disabled}
          value={value} // Use value here
          onChange={onChange} // Attach onChange handler
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name} // Attach name prop
          placeholder={placeholder}
          disabled={disabled}
          value={value} // Use value here
          defaultValue={defaultValue} // Use defaultValue here
          onChange={onChange} // Attach onChange handler
          className={`w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          {...rest}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextInput;
