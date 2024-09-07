import { useState } from "react";

const useModal = <T>() => {
    const [id, setId] = useState(-1);
    const [data, setData] = useState<T>({} as T);
    const [isOpen, setIsOpen] = useState(false);
    return { id, isOpen, data, setId, setData, setIsOpen }
};
export default useModal;