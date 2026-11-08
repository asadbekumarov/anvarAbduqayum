import React from "react";

export const QolipSectionSkeleton: React.FC<{ height?: string }> = ({
  height = "h-96",
}) => {
  return (
    <div
      className={`w-full ${height} bg-[#EBE4D6]/40 border-b border-[#1C1A17]/10 p-6 flex flex-col justify-between animate-pulse`}
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="w-32 h-4 bg-[#1C1A17]/10 rounded-[1px]" />
        <div className="w-64 h-8 bg-[#1C1A17]/15 rounded-[1px]" />
        <div className="w-full max-w-xl h-4 bg-[#1C1A17]/10 rounded-[1px]" />
      </div>
    </div>
  );
};

