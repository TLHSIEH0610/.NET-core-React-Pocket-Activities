import { Modal } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../commonSlice";

export default function ModalContainer() {
  const { open, body } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} size="mini">
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
}
