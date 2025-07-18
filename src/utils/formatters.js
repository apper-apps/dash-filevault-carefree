import { format } from "date-fns";

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy");
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy 'at' h:mm a");
};