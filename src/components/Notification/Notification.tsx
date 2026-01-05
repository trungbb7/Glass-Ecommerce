import { useAppDispatch } from "@/hooks";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeNotification } from "./notificationSlice";
import type { Notification as NotificatinType } from "@/types/notification";

interface NotificationProps {
  notification: NotificatinType;
}

export default function Notification({ notification }: NotificationProps) {
  const classnameVariants = {
    parent: {
      success: "bg-green-50 text-green-700",
      info: "bg-blue-50 text-blue-700",
      warning: "bg-amber-50 text-amber-700",
      error: "bg-red-50 text-red-700",
    },
    icon: {
      success: "hover:bg-green-100",
      info: "hover:bg-blue-100",
      warning: "hover:bg-warning-100",
      error: "hover:bg-red-100",
    },
  };

  const dispatch = useAppDispatch();
  return (
    <div
      className={`flex items-center gap-3 fixed top-1 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow animate-dropdown z-99999999 ${classnameVariants.parent[notification.type]}`}
    >
      <div>
        <FontAwesomeIcon icon={faCircleCheck} className="mr-1" />{" "}
        <span className="font-medium">{notification.title}! </span>
        {notification.message}
      </div>
      <div
        onClick={() => dispatch(closeNotification())}
        className={`p-1 rounded-lg cursor-pointer ${classnameVariants.icon[notification.type]}`}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
}
