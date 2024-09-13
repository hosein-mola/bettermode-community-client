import {useCallback} from "react";

const useScrollToElement = (elementId) => {
    const scrollToElement = useCallback(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [elementId]);

    return scrollToElement;
};

export default useScrollToElement;
