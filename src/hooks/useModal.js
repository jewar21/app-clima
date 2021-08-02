import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [isOpen, setisOpen] = useState(initialValue);

  const openModal = () => setisOpen(true);
  const closeModal = () => setisOpen(false);
  const handleStateChange = (newState) => setisOpen(newState);

  return [isOpen, openModal, closeModal, handleStateChange];
};
