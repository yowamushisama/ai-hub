import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import { X } from "lucide-react";
import { NodeData, NodeType } from "..";
import { NodeTypeOption } from "./MindMapModel";
interface MindMapNodeEditModalProps {
  node: Node<NodeData>;
  onClose: () => void;
  onSave: (data: NodeData) => void;
  nodeTypes: NodeTypeOption[];
}

const MindMapNodeEditModal: React.FC<MindMapNodeEditModalProps> = ({
  node,
  onClose,
  onSave,
  nodeTypes,
}) => {
  // Local state for form fields
  const [label, setLabel] = useState(node.data.label || "");
  const [description, setDescription] = useState(node.data.description || "");
  const [nodeType, setNodeType] = useState<NodeType>(
    node.data.type || NodeType.PRIMARY
  );

  // Initialize state when node changes
  useEffect(() => {
    setLabel(node.data.label || "");
    setDescription(node.data.description || "");
    setNodeType(node.data.type || NodeType.PRIMARY);
  }, [node]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!label.trim()) return;

    // Create updated node data
    const updatedData: NodeData = {
      ...node.data,
      label,
      description: description || undefined,
      type: nodeType,
    };

    // Call save handler
    onSave(updatedData);
  };

  // Handle outside click (close modal)
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-md w-full p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Edit Node
          </h3>
          <button
            className="p-1 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Label Field */}
          <div>
            <label
              htmlFor="node-label"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Node Label <span className="text-red-500">*</span>
            </label>
            <input
              id="node-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter node label"
              className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="node-description"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="node-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter optional description"
              className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none h-24"
            />
          </div>

          {/* Node Type Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Node Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {nodeTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`p-2 rounded-md border text-xs transition-colors ${
                    nodeType === type.value
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "border-neutral-300 dark:border-neutral-600 hover:border-primary-300 dark:hover:border-primary-600 text-neutral-700 dark:text-neutral-300"
                  }`}
                  onClick={() => setNodeType(type.value as NodeType)}
                >
                  <div
                    className="w-4 h-4 mx-auto mb-1 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="block truncate">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
              disabled={!label.trim()}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MindMapNodeEditModal;
