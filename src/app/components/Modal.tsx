import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View All Products"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">View All Products</h2>
        <p className="mb-4">Are you sure you want to view all products?</p>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Yes, Show me
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
