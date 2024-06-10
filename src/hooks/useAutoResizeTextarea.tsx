import { useEffect, useRef } from "react";

const useAutoResizeTextarea = (maxRows: number) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const resizeTextarea = () => {
			textarea.style.height = "auto";
			const scrollHeight = textarea.scrollHeight;
			const lineHeight = parseInt(
				window.getComputedStyle(textarea).lineHeight,
				10
			);
			const maxHeight = lineHeight * maxRows;
			textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
		};

		textarea.addEventListener("input", resizeTextarea);
		resizeTextarea();

		return () => {
			textarea.removeEventListener("input", resizeTextarea);
		};
	}, [maxRows]);

	return textareaRef;
};

export default useAutoResizeTextarea;
