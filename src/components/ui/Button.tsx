import clsx from "clsx";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children: React.ReactNode;
	tabIndex?: number;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

function Button({
	type = "button",
	children,
	tabIndex,
	className,
	onClick,
	disabled,
}: ButtonProps) {
	return (
		<button
			type={type}
			tabIndex={tabIndex}
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"btn cursor-pointer flex items-center justify-center bg-primary-500 text-primary-50 px-4.5 py-1.5 font-title rounded-lg text-[16px] xl:text-[18px]",
				className,
			)}
		>
			<span className="relative z-1">{children}</span>
		</button>
	);
}

export default Button;
