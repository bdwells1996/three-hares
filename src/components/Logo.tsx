import Image from "next/image";
import clsx from "clsx";

interface LogoProps {
	className?: string;
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Image
			src="/images/logo/logo.svg"
			alt="Three Hares"
			loading="eager"
			width={52}
			height={52}
			className={clsx("w-18 h-18", className)}
		/>
	);
};
