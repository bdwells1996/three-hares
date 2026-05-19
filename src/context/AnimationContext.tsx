"use client";

import {
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

type AnimationContextType = {
	isReady: boolean;
	markReady: () => void;
};

const AnimationContext = createContext<AnimationContextType>({
	isReady: false,
	markReady: () => {},
});

export function AnimationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isReady, setIsReady] = useState(false);
	const markReady = useCallback(() => setIsReady(true), []);

	return (
		<AnimationContext.Provider value={{ isReady, markReady }}>
			{children}
		</AnimationContext.Provider>
	);
}

export const useAnimation = () => useContext(AnimationContext);
