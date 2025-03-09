"use client";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import template from "./test-mindmap.json";
import {
  MindMapConfig,
  GenericMindMapGeneratorProps,
  Field,
  InputField,
  OptionField,
  BaseField,
  FieldType,
  SliderField,
  ToggleField,
  Section,
} from "@/components/types/Model/MindMapTypes";

const GenericMindMapGenerator: React.FC<GenericMindMapGeneratorProps> = ({
  config,
  formValues,
  onFormChange,
  onSubmit,
  isLoading = false,
  error = null,
  className = "",
  toolId,
}) => {
  // State
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>(
    {}
  );
  const [showExamplePrompts, setShowExamplePrompts] = useState(false);

  // Apply custom styling
  const customStyles = config.styling || {};
  const primaryColor = customStyles.colors?.primary || "var(--primary-600)";
  const secondaryColor =
    customStyles.colors?.secondary || "var(--secondary-600)";
  const borderRadius = customStyles.borderRadius || "0.75rem";
  const headerGradient =
    customStyles.headerGradient || "from-primary-50 to-white";

  // Initialize activeSections based on defaultOpen property
  useEffect(() => {
    const initialActiveSections: Record<string, boolean> = {};
    config.sections.forEach((section) => {
      initialActiveSections[section.id] = section.defaultOpen || false;
    });
    setActiveSections(initialActiveSections);
  }, [config]);

  // Helper to get Lucide icon by name
  const getIcon = (name: string, className: string = "w-4 h-4") => {
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Toggle a section's expanded state
  const toggleSection = (sectionId: string) => {
    setActiveSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle field value changes
  const handleFieldChange = (name: string, value: any) => {
    onFormChange({
      ...formValues,
      [name]: value,
    });
  };

  // Check if a field should be visible based on conditions
  const isFieldVisible = (field: Field): boolean => {
    if (!field.visibleWhen) return true;
    const { field: dependentField, operator, value } = field.visibleWhen;
    const dependentValue = formValues[dependentField];

    switch (operator) {
      case "equals":
        return dependentValue === value;
      case "notEquals":
        return dependentValue !== value;
      case "contains":
        return (
          typeof dependentValue === "string" && dependentValue.includes(value)
        );
      case "gt":
        return dependentValue > value;
      case "lt":
        return dependentValue < value;
      default:
        return true;
    }
  };

  // Render a field based on its type
  const renderField = (field: Field) => {
    // Check visibility conditions
    if (!isFieldVisible(field)) return null;

    // Check for custom renderer
    if (config.customRenderers?.fields?.[field.type]) {
      return config.customRenderers.fields[field.type](
        field,
        formValues[field.name],
        (value) => handleFieldChange(field.name, value)
      );
    }

    switch (field.type) {
      case "input":
        return (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && getIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formValues[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={(field as InputField).placeholder}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-neutral-50"
              required={field.required}
              disabled={isLoading}
            />
            {field.helpText && (
              <p className="text-xs text-neutral-500">{field.helpText}</p>
            )}
          </div>
        );

      case "textarea":
        const textareaField = field as InputField;
        return (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && getIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={formValues[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={textareaField.placeholder}
              className={`w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-neutral-50 resize-none ${
                textareaField.size || ""
              }`}
              rows={textareaField.rows || 3}
              required={field.required}
              disabled={isLoading}
            />
            {field.helpText && (
              <p className="text-xs text-neutral-500">{field.helpText}</p>
            )}
          </div>
        );

      case "dropdown":
        const dropdownField = field as OptionField;
        return (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && getIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {dropdownField.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFieldChange(field.name, option.id)}
                  className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    formValues[field.name] === option.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-primary-500/30 hover:bg-neutral-50"
                  }`}
                  disabled={isLoading}
                >
                  {option.icon && (
                    <div
                      className={`p-2 rounded-lg ${
                        formValues[field.name] === option.id
                          ? "bg-primary-100 text-primary-600"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {getIcon(option.icon)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-sm">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-neutral-500 mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {field.helpText && (
              <p className="text-xs text-neutral-500">{field.helpText}</p>
            )}
          </div>
        );

      case "buttonGroup":
        const buttonGroupField = field as OptionField;
        return (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && getIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div
              className={
                buttonGroupField.layout === "grid"
                  ? `grid grid-cols-${buttonGroupField.columnsCount || 3} gap-2`
                  : buttonGroupField.layout === "vertical"
                  ? "flex flex-col gap-2"
                  : "flex gap-2"
              }
            >
              {buttonGroupField.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFieldChange(field.name, option.id)}
                  className={`${
                    buttonGroupField.layout === "vertical" ? "w-full" : "flex-1"
                  } px-4 py-3 rounded-xl border text-sm transition-all ${
                    formValues[field.name] === option.id
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-neutral-200 hover:border-primary-500/50 text-neutral-600 hover:bg-neutral-50"
                  }`}
                  disabled={isLoading}
                >
                  {option.label}
                  {option.description && (
                    <span className="block text-xs text-neutral-500 mt-1">
                      {option.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {field.helpText && (
              <p className="text-xs text-neutral-500">{field.helpText}</p>
            )}
          </div>
        );

      case "toggle":
        return (
          <div className="p-3 rounded-lg border border-neutral-200 hover:border-primary-500/30 transition-all">
            <button
              className="flex items-center gap-3 w-full text-left"
              onClick={() =>
                handleFieldChange(field.name, !formValues[field.name])
              }
              disabled={isLoading}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  formValues[field.name]
                    ? "bg-primary-100 text-primary-600"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {formValues[field.name]
                  ? getIcon("CheckSquare", "w-4 h-4")
                  : getIcon("Square", "w-4 h-4")}
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-700">
                  {field.label}
                </div>
                {field.helpText && (
                  <div className="text-xs text-neutral-500">
                    {field.helpText}
                  </div>
                )}
              </div>
            </button>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={field.name}
              checked={formValues[field.name] || false}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              disabled={isLoading}
            />
            <label htmlFor={field.name} className="text-sm text-neutral-700">
              {field.label}
            </label>
          </div>
        );

      case "slider":
        const sliderField = field as SliderField;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">
                {field.label}
              </label>
              <span className="text-sm text-neutral-600 font-medium">
                {formValues[field.name] || sliderField.min}
              </span>
            </div>
            <input
              type="range"
              min={sliderField.min}
              max={sliderField.max}
              step={sliderField.step || 1}
              value={formValues[field.name] || sliderField.min}
              onChange={(e) =>
                handleFieldChange(field.name, Number(e.target.value))
              }
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-neutral-500">
              <span>{sliderField.min}</span>
              <span>{sliderField.max}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Check if the submit button should be disabled
  const isSubmitDisabled = () => {
    // Find required fields and check if they have values
    return (
      config.sections
        .flatMap((section) => section.fields)
        .filter((field) => field.required)
        .some((field) => !formValues[field.name]) || isLoading
    );
  };

  // Render a section with its fields
  const renderSection = (section: Section) => {
    // Check for custom section renderer
    if (config.customRenderers?.sections?.[section.id]) {
      return config.customRenderers.sections[section.id](section);
    }

    return (
      <div
        key={section.id}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        {/* Section Header */}
        <button
          className={`w-full flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-gradient-to-r ${headerGradient} section-header`}
          onClick={() => toggleSection(section.id)}
          disabled={isLoading}
        >
          <h4 className="font-medium text-neutral-800 flex items-center gap-2">
            {section.icon && getIcon(section.icon, "w-4 h-4 text-primary-600")}
            {section.title}
          </h4>
          {getIcon(
            "ArrowRight",
            `w-4 h-4 text-neutral-500 transition-transform ${
              activeSections[section.id] ? "rotate-90" : ""
            }`
          )}
        </button>

        {/* Section Content */}
        {activeSections[section.id] && (
          <div className="p-4 space-y-4">
            {section.description && (
              <p className="text-sm text-neutral-600">{section.description}</p>
            )}
            {section.fields.map((field, index) => (
              <div key={`${section.id}-field-${index}`}>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div
      className={`mindmap-generator overflow-y-auto max-h-full ${className}`}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--border-radius": borderRadius,
        } as React.CSSProperties
      }
    >
      <div className="space-y-4 p-4">
        {/* Header */}
        {/* <div className="flex items-center gap-2">
          {config.headerIcon &&
            getIcon(config.headerIcon, "w-5 h-5 text-primary-600")}
          <h3 className="font-medium text-neutral-900">{config.title}</h3>
        </div> */}

        {/* Description */}
        {/* <p className="text-sm text-neutral-600">{config.description}</p> */}

        {/* Error message if present */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 border border-red-200 shadow-sm">
            {getIcon("AlertCircle", "w-5 h-5 flex-shrink-0")}
            <span>{error}</span>
          </div>
        )}

        {/* Render each section */}
        {config.sections.map((section) => renderSection(section))}

        {/* Example prompts section */}
        {config.examplePrompts && config.examplePrompts.length > 0 && (
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 mt-2">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setShowExamplePrompts(!showExamplePrompts)}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                {getIcon("Info", "w-4 h-4 text-primary-600")}
                <span>Need inspiration? See example topics</span>
              </div>
              {getIcon(
                "ArrowRight",
                `w-4 h-4 text-neutral-500 transition-transform ${
                  showExamplePrompts ? "rotate-90" : ""
                }`
              )}
            </button>

            {showExamplePrompts && (
              <div className="mt-3 space-y-2">
                {config.examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="w-full p-2 text-left text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => {
                      // Find the main topic field
                      const mainTopicField = config.sections
                        .flatMap((section) => section.fields)
                        .find((field) => field.name === "mainTopic");

                      if (mainTopicField) {
                        handleFieldChange("mainTopic", prompt);
                        setShowExamplePrompts(false);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit button */}
        <div className="pt-2">
          <button
            onClick={onSubmit}
            disabled={isSubmitDisabled()}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                {getIcon(
                  config.submitButton.loadingIcon,
                  "w-5 h-5 animate-spin"
                )}
                <span>{config.submitButton.loadingLabel}</span>
              </>
            ) : (
              <>
                {getIcon(config.submitButton.icon, "w-5 h-5")}
                <span>{config.submitButton.label}</span>
              </>
            )}
          </button>

          {/* Tip section */}
          <div className="flex items-start gap-2 mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            {getIcon(
              "AlertCircle",
              "w-4 h-4 flex-shrink-0 mt-0.5 text-primary-600"
            )}
            <div className="text-xs text-neutral-600">
              <p className="font-medium mb-1">
                {config.tipText?.title || "Pro tip:"}
              </p>
              <p>
                {config.tipText?.content ||
                  "After generation, you can further refine your mind map by adding, editing, or removing nodes and connections directly in the canvas."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericMindMapGenerator;
