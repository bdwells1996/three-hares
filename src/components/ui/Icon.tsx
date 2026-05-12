import { type SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
	icon: React.FC<SVGProps<SVGSVGElement>>;
	size?: number;
}

export function Icon({ icon: SvgIcon, size = 16, className, ...props }: IconProps) {
	return <SvgIcon width={size} height={size} className={className} {...props} />;
}
