"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

interface UseInViewAnimationOptions {
	/** 0–1: how much of the element must be visible before triggering. Default 0.1 */
	threshold?: number;
	/** Once triggered, stop observing. Default true */
	once?: boolean;
	/** IntersectionObserver rootMargin — use to pre-trigger before element enters view. Default "0px" */
	rootMargin?: string;
}

/**
 * Returns a ref to attach to the element and a boolean that becomes true when:
 * 1. The loading screen has finished (isReady), AND
 * 2. The element is within the viewport (within the given threshold).
 *
 * Elements already in view when isReady fires will trigger immediately.
 * Elements below the fold will trigger when they scroll into view.
 */
export function useInViewAnimation<T extends Element = HTMLDivElement>(
	options: UseInViewAnimationOptions = {},
) {
	const { threshold = 0.1, once = true, rootMargin = "0px" } = options;
	const { isReady } = useAnimation();
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		if (!isReady) return;

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setInView(true);
					if (once) observer.disconnect();
				} else if (!once) {
					setInView(false);
				}
			},
			{ threshold, rootMargin },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [isReady, threshold, once, rootMargin]);

	return { ref, inView };
}
