import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const openDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };
  
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  return {
    showModal,
    showDetailModal,
    selectedItem,
    openModal,
    closeModal,
    openDetailModal,
    closeDetailModal,
    setSelectedItem
  };
};