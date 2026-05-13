import clsx from "clsx";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children: React.ReactNode;
	tabIndex?: number;
	className?: string;
}

function Button({
	type = "button",
	children,
	tabIndex,
	className,
}: ButtonProps) {
	return (
		<button
			type={type}
			tabIndex={tabIndex}
			className={clsx(
				"cursor-pointer flex items-center justify-center bg-primary-500 text-primary-50 px-4.5 py-2 font-title rounded-lg text-[16px] xl:text-[18px]",
				className,
			)}
		>
			{children}
		</button>
	);
}

export default Button;
