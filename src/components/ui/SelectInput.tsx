import { ChevronDown } from "lucide-react";

interface SelectInputProps {
	label: string;
	name: string;
	placeholder: string;
	options: string[];
	error?: string[];
}

export default function SelectInput({ label, name, placeholder, options, error }: SelectInputProps) {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={name} className="text-body-md text-primary-950 font-body">
				{label}
			</label>
			<div className="relative">
				<select
					id={name}
					name={name}
					defaultValue=""
					className="appearance-none bg-white border border-primary-400 rounded-md px-3 py-2 h-[42px] w-full text-body-md font-body text-primary-500 focus:outline-none focus:border-primary-600 cursor-pointer"
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				<ChevronDown
					size={16}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-950 pointer-events-none"
				/>
			</div>
			{error && <p className="text-red-600 text-body-sm">{error[0]}</p>}
		</div>
	);
}
