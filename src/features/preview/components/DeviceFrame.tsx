import React, { memo } from 'react';

interface DeviceFrameProps {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  children: React.ReactNode;
}

const DeviceFrame = memo(({ deviceType, children }: DeviceFrameProps) => {
  if (deviceType === 'mobile') {
    return (
      <div className="relative">
        {/* Mobile notch */}
        <div className="absolute top-0 left-0 right-0 flex justify-center h-8">
          <div className="bg-gray-800 w-36 h-6 rounded-b-xl flex items-center justify-center">
            <div className="w-12 h-2.5 rounded-full bg-gray-700 mr-2"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
          </div>
        </div>

        {children}

        {/* Mobile home indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex justify-center items-center">
          <div className="w-32 h-1.5 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div className="relative">
        {/* Tablet camera */}
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
        </div>

        {children}
      </div>
    );
  }

  // Desktop has no frame
  return <>{children}</>;
});

DeviceFrame.displayName = 'DeviceFrame';

export default DeviceFrame;
