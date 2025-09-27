import { closeMessageDialog } from "../../store";
import BaseDialog from "./BaseDialog";
import ActionButton from "./ActionButton";

interface MessageDialogProps {
  title?: string;
  message: string;
}

export default function MessageDialog({
  title = "Сообщение",
  message,
}: MessageDialogProps) {
  return (
    <BaseDialog onClose={closeMessageDialog}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 text-center">
          {title}
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 whitespace-pre-line text-center">
          {message}
        </p>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <ActionButton onClick={closeMessageDialog} variant="primary">
          Закрыть
        </ActionButton>
      </div>
    </BaseDialog>
  );
}
