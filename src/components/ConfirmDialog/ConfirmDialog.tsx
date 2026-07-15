import { Modal } from "../Modal/Modal";
import "./ConfirmDialog.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "primary";
}

/**
 * Boîte de dialogue de confirmation (ex: avant une suppression).
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "primary"
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions flex items-center justify-between mt-6">
        <button className="btn-outline" onClick={onClose}>
          {cancelText}
        </button>
        <button 
          className={type === "danger" ? "btn-danger" : "btn-primary"} 
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
