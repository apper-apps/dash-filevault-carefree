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

export const calculateStorage = (files) => {
  // Calculate total used storage from files
  const usedStorage = files.reduce((total, file) => {
    return total + (file.size || 0);
  }, 0);
  
  // For demo purposes, set total storage to 5GB
  const totalStorage = 5 * 1024 * 1024 * 1024; // 5GB in bytes
  const availableStorage = totalStorage - usedStorage;
  const usagePercentage = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0;
  
  return {
    totalStorage,
    usedStorage,
    availableStorage,
    usagePercentage
  };
};

export const isValidDateRange = (dateRange) => {
  if (!dateRange || (!dateRange.start && !dateRange.end)) {
    return true;
  }
  
  if (dateRange.start && dateRange.end) {
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return startDate <= endDate;
  }
  
  return true;
};

export const formatSizeRange = (sizeRange) => {
  if (!sizeRange) return 'All sizes';
  
  const formatSize = (bytes) => {
    if (bytes === null || bytes === undefined) return null;
    return formatFileSize(bytes);
  };
  
  const min = formatSize(sizeRange.min);
  const max = formatSize(sizeRange.max);
  
  if (min && max) {
    return `${min} - ${max}`;
  } else if (min) {
    return `> ${min}`;
  } else if (max) {
    return `< ${max}`;
  }
  
  return 'Custom range';
};