// app/tool/[id]/page.tsx
import React from "react";
import MainTool from "@/components/ToolDetail/MainToolDetail";

// This page receives the dynamic route parameter as part of `params`
interface ToolDetailPageProps {
  params: { id: string };
}

const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="p-6">
      {/* Pass the tool id as a prop to MainTool */}
      <MainTool toolId={id} />
    </div>
  );
};

export default ToolDetailPage;
