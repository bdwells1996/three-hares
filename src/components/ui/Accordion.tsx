"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const portableTextComponents = {
	marks: {
		link: ({
			value,
			children,
		}: {
			value?: { href?: string };
			children: React.ReactNode;
		}) => {
			const href = value?.href ?? "";
			const isInternal = href.startsWith("/");
			return isInternal ? (
				<Link href={href} className="underline">
					{children}
				</Link>
			) : (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					{children}
				</a>
			);
		},
	},
};

interface AccordionItem {
	_id: string;
	question: string;
	answer: PortableTextBlock[];
}

interface AccordionProps {
	items: AccordionItem[];
}

function Accordion({ items }: AccordionProps) {
	return (
		<RadixAccordion.Root
			type="multiple"
			className="w-full border border-primary-200 md:rounded-xl overflow-hidden"
		>
			{items.map((item, index) => (
				<RadixAccordion.Item
					key={item._id}
					value={`item-${index}`}
					className={clsx(
						"bg-secondary-50 border-t border-primary-200 first:border-t-0",
					)}
				>
					<RadixAccordion.Header>
						<RadixAccordion.Trigger className="group flex w-full items-center gap-4 px-4 py-3.5 text-left cursor-pointer">
							<span className="flex-1 text-body-lg font-title text-primary-950 min-w-0">
								{item.question}
							</span>
							<ChevronDown
								size={16}
								className="shrink-0 text-primary-950 transition-transform duration-200 group-data-[state=open]:rotate-180"
							/>
						</RadixAccordion.Trigger>
					</RadixAccordion.Header>
					<RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
						<div className="pb-6 pl-4 pr-6 pt-2 text-body-lg text-primary-950 [&>p+p]:mt-3">
							<PortableText
								value={item.answer}
								components={portableTextComponents}
							/>
						</div>
					</RadixAccordion.Content>
				</RadixAccordion.Item>
			))}
		</RadixAccordion.Root>
	);
}

export default Accordion;
