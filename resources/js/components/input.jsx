const Input = ({
    label,
    name,
    type = "text",
    placeholder = "",
    description = null,
    handleChange,
    defaultValue = null,
    icon = null,
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    name={name}
                    id={name}
                    className="focus:border-red-500 focus:ring-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                />
            </div>
            {description && (
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            )}
        </div>
    );
};

export default Input;
