import React from 'react'

interface TextInputProps {
  label: string
  placeholder: string
  type?: string
  isSelect?: boolean
  disabled?: boolean
  options?: string[]
  error?: string
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  name?: string
}

export default function TextInput({
  label,
  placeholder,
  type = 'text',
  isSelect = false,
  disabled = false,
  options = [],
  error,
  value,
  defaultValue,
  onChange,
  name,
  ...rest
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {isSelect ? (
        <select
          name={name}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
          disabled={disabled}
          value={value as string}
          onChange={onChange}
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
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          {...rest}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}