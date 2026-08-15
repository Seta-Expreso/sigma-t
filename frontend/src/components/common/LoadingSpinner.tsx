/**
 * @fileoverview Componente de spinner de carga
 * @module components/common/LoadingSpinner
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray' | 'reoptimize';
  message?: string;
  className?: string;
  fullPage?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colorClasses = {
  primary: 'border-primaryLight',
  white: 'border-white',
  gray: 'border-gray-500',
  reoptimize: 'border-purple-500',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  message,
  className = '',
  fullPage = false,
}) => {
  const spinner = (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'h-screen' : ''} ${className}`}>
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            border-4 border-t-transparent rounded-full animate-spin
            ${colorClasses[color]}
          `}
        />
        {size === 'lg' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-t-transparent border-primaryLight/30 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      {message && (
        <p className="mt-3 text-sm text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;