import styles from "./Modal.module.css";
import cross_icon from "../../assets/icons/cerrar.png";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div className="w-[min(90%,800px)] relative">
            <button
              className="top-2 right-2 absolute duration-500 group hover:bg-transparent hover:text-red-600 border-2 border-transparent hover:border-red-600 flex justify-center items-center rounded-full bg-red-600 text-slate-50 w-[30px] h-[30px] p-[6px]"
              onClick={onClose}
            >
              <img
                className="duration-500 filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
                src={cross_icon}
                alt="close"
              />
            </button>

            <div className={styles.modal_body}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
export function ModalLoading({ isOpen, children }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div className="w-[min(90%,800px)] relative">
            <div className={styles.modal_body}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
