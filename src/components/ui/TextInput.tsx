interface TextInputProps {
	label: string;
	name: string;
	placeholder: string;
	type?: string;
	error?: string[];
}

export default function TextInput({
	label,
	name,
	placeholder,
	type = "text",
	error,
}: TextInputProps) {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={name} className="text-body-md text-primary-950 font-body">
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				className="bg-white border border-primary-400 rounded-md px-3 py-2 h-[42px] text-body-lg font-body text-primary-950 placeholder:text-primary-500 focus:outline-none focus:border-primary-600"
			/>
			{error && <p className="text-red-600 text-body-sm">{error[0]}</p>}
		</div>
	);
}
