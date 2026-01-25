import React, { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  width = 400,
  height = 300
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={className}>
        <div 
          role="img" 
          aria-label={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#666',
            fontSize: '14px',
          }}
        >
          Failed to load image
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onError={() => setHasError(true)}
        style={{
          opacity: hasError ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};