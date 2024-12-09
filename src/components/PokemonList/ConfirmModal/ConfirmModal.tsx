import "./index.scss";

interface ConfirmModalProps {
  handleAddLimit: () => void;
  handleModalView: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleAddLimit,
  handleModalView,
}) => {
  const handleYesButton = () => {
    handleModalView();
    handleAddLimit();
  };

  return (
    <div className="confirm-modal">
      <span className="confirm-modal__title">Warning</span>

      <span className="confirm-modal__text">
        Pokemons will be loaded with the filters you selected
      </span>

      <div className="confirm-modal__buttons">
        <button onClick={handleYesButton} className="modal-button">
          Yes
        </button>
        <button onClick={handleModalView} className="modal-button">
          No
        </button>
      </div>
    </div>
  );
};
