import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { formatFileSize } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const StorageMeter = ({ 
  totalStorage, 
  usedStorage, 
  availableStorage, 
  usagePercentage,
  className 
}) => {
  return (
    <div className={cn("flex items-center space-x-2 text-sm", className)}>
      <ApperIcon name="HardDrive" className="w-4 h-4 text-neutral-500" />
      
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-neutral-600 whitespace-nowrap">
            {formatFileSize(usedStorage)} / {formatFileSize(totalStorage)}
          </span>
        </div>
        
        <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-300",
              usagePercentage > 85 ? "bg-red-500" :
              usagePercentage > 70 ? "bg-yellow-500" :
              "bg-primary"
            )}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
      </div>
      
      <div className="text-xs text-neutral-500">
        {usagePercentage.toFixed(1)}%
      </div>
    </div>
  );
};

export default StorageMeter;