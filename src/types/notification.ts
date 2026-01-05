export interface Notification {
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
}
