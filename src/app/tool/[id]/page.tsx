// app/tool/[id]/page.tsx
import React from "react";
import MainTool from "@/components/ToolDetail/MainToolDetail";
import { ToolInfo } from "@/components/types/Model/Tools/Tools";

import MindMapGenerator from "@/components/DiagramGenerator/MindMapGenerator";
import axios from "axios";
// This page receives the dynamic route parameter as part of `params`
interface ToolDetailPageProps {
  params: { id: string };
}
const categoryComponentMapping: Record<string, React.FC<any>> = {
  text: MainTool,
  diagram: MindMapGenerator,
};

const ToolDetailPage: React.FC<ToolDetailPageProps> = async ({ params }) => {
  const { id } = params;
  const response = await axios.get<ToolInfo>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/info/${id}`
  );
  const toolData = response.data;
  const category = toolData.category.name;
  console.log("toolData", toolData);

  console.log("category", category);

  const ComponentToRender = categoryComponentMapping[category] || MainTool;

  return (
    <div>
      {/* Pass the tool id as a prop to MainTool */}
      <ComponentToRender toolId={id} />
    </div>
  );
};

export default ToolDetailPage;
