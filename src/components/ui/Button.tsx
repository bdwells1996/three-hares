interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children: React.ReactNode;
	tabIndex?: number;
}

function Button({ type = "button", children, tabIndex }: ButtonProps) {
	return (
		<button
			type={type}
			tabIndex={tabIndex}
			className="cursor-pointer flex items-center justify-center bg-primary-500 px-4.5 py-2 font-title rounded-lg text-[16px] xl:text-[18px]"
		>
			{children}
		</button>
	);
}

export default Button;
