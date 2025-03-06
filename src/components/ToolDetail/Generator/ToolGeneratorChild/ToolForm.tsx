import React, { useState, useEffect, useRef } from "react";
import {
  PenTool,
  Sparkles,
  ChevronDown,
  Wand2,
  RefreshCw,
  Target,
  Building2,
  Plus,
  Minus,
  AlertCircle,
  FileText,
  Image,
  Video,
  Mic,
  Code,
  Search,
  Bot,
  Check,
  LucideIcon,
} from "lucide-react";
import {
  ToolConfig,
  FormField,
  FormRow,
} from "@/components/types/Model/Tools/Tools";

// Comprehensive icon mapping
const iconMap: Record<string, React.ElementType> = {
  PenTool,
  Sparkles,
  ChevronDown,
  Wand2,
  RefreshCw,
  Target,
  Building2,
  Plus,
  Minus,
  AlertCircle,
  FileText,
  Image,
  Video,
  Mic,
  Code,
  Search,
  Bot,
  Check,
};

export interface ToolFormProps {
  config: ToolConfig;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  className?: string;
  isLoading?: boolean;
  forceDisable?: boolean; // New prop to force disable the entire form
}

const ToolForm: React.FC<ToolFormProps> = ({
  config,
  onSubmit,
  className = "",
  isLoading = false,
  forceDisable = false,
}) => {
  // State
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {}
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [firstInputFieldName, setFirstInputFieldName] = useState<string | null>(
    null
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Refs for click outside handling
  const dropdownRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement | null>>
  >({});

  // Initialize refs for dropdown fields
  useEffect(() => {
    const newRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    config.rows.forEach((row) => {
      row.fields.forEach((field) => {
        if (field.type === "dropdown") {
          newRefs[field.name] = React.createRef<HTMLDivElement>();
        }
      });
    });
    dropdownRefs.current = newRefs;
  }, [config]);

  // Find the first input field in the config
  useEffect(() => {
    findFirstInputField(config);
    initializeFormState(config);
  }, [config]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([fieldName, ref]) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setDropdownStates((prev) => ({ ...prev, [fieldName]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the first input field in the config to use for enable/disable logic
  const findFirstInputField = (config: ToolConfig) => {
    for (const row of config.rows) {
      for (const field of row.fields) {
        if (field.type === "input" || field.type === "textarea") {
          setFirstInputFieldName(field.name);
          return;
        }
      }
    }
  };

  // Initialize form state based on config
  const initializeFormState = (config: ToolConfig) => {
    const initialState: Record<string, any> = {};
    const initialDropdownState: Record<string, boolean> = {};

    config.rows.forEach((row) => {
      row.fields.forEach((field) => {
        // Set initial form values
        if (field.defaultValue !== undefined) {
          initialState[field.name] = field.defaultValue;
        } else {
          switch (field.type) {
            case "input":
            case "textarea":
              initialState[field.name] = "";
              break;
            case "dropdown":
              initialDropdownState[field.name] = false;
              if (field.options && field.options.length > 0) {
                const firstOption = field.options[0];
                initialState[field.name] =
                  typeof firstOption === "string"
                    ? firstOption
                    : firstOption.id || firstOption.value || firstOption.label;
              }
              break;
            case "buttonGroup":
              if (field.options && field.options.length > 0) {
                const firstOption = field.options[0];
                initialState[field.name] =
                  typeof firstOption === "string"
                    ? firstOption
                    : firstOption.id || firstOption.value || firstOption.label;
              }
              break;
            case "toggle":
              initialState[field.name] = false;
              break;
            case "slider":
              initialState[field.name] = field.min || 0;
              break;
            case "counter":
              initialState[field.name] = field.min || 0;
              break;
          }
        }
      });
    });

    setFormData(initialState);
    setDropdownStates(initialDropdownState);
  };

  // Generate icon component from name
  const renderIcon = (iconName: string, className: string = "w-4 h-4") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Handle field value changes
  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Toggle dropdown state
  const toggleDropdown = (name: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Validate all form fields
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    config.rows.forEach((row) => {
      row.fields.forEach((field) => {
        // Check required fields
        if (
          field.required &&
          (!formData[field.name] || formData[field.name] === "")
        ) {
          errors[field.name] = `${field.label} is required`;
        }

        // Run custom validation if provided
        if (field.validate && formData[field.name] !== undefined) {
          const error = field.validate(formData[field.name]);
          if (error) {
            errors[field.name] = error;
          }
        }

        // Validate min/max for numeric fields
        if (
          (field.type === "counter" || field.type === "slider") &&
          field.min !== undefined &&
          formData[field.name] < field.min
        ) {
          errors[
            field.name
          ] = `${field.label} cannot be less than ${field.min}`;
        }

        if (
          (field.type === "counter" || field.type === "slider") &&
          field.max !== undefined &&
          formData[field.name] > field.max
        ) {
          errors[
            field.name
          ] = `${field.label} cannot be more than ${field.max}`;
        }
      });
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if submit button should be enabled
  const isSubmitButtonDisabled = (): boolean => {
    // Force disable takes precedence
    if (forceDisable || hasSubmitted) return true;

    // Disable if currently generating results
    if (isLoading) return true;

    // Disable if the first input field is empty
    if (
      firstInputFieldName &&
      (!formData[firstInputFieldName] || formData[firstInputFieldName] === "")
    ) {
      return true;
    }

    return false;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setHasSubmitted(true);

    // Send form data to parent component
    await onSubmit(formData);
  };

  // Determine if the entire form should be disabled
  const isFormDisabled = forceDisable || isLoading || hasSubmitted;

  // Render field based on type
  const renderField = (field: FormField, index: number) => {
    switch (field.type) {
      case "input":
        return (
          <div key={field.name} className="w-full space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && renderIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div>
              <input
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-xl border ${
                  validationErrors[field.name]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20"
                } focus:ring-2 transition-all text-sm bg-neutral-50 ${
                  field.size || ""
                } ${isFormDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isFormDisabled}
              />
              {validationErrors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors[field.name]}
                </p>
              )}
            </div>
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="w-full space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              {field.icon && renderIcon(field.icon, "w-4 h-4 text-primary-600")}
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div>
              <textarea
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-xl border ${
                  validationErrors[field.name]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20"
                } focus:ring-2 transition-all text-sm bg-neutral-50 resize-none ${
                  field.size || ""
                } ${isFormDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
                rows={field.rows || 3}
                disabled={isFormDisabled}
              />
              {validationErrors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors[field.name]}
                </p>
              )}
            </div>
          </div>
        );

      case "dropdown":
        return (
          <div key={field.name} className="relative w-full">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div ref={dropdownRefs.current[field.name]} className="relative">
              <button
                type="button"
                onClick={() => !isFormDisabled && toggleDropdown(field.name)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  validationErrors[field.name]
                    ? "border-red-300"
                    : "border-neutral-200 hover:border-primary-500/50"
                } flex items-center justify-between transition-all text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                  isFormDisabled ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isFormDisabled}
                aria-expanded={dropdownStates[field.name]}
              >
                <div className="flex items-center gap-2">
                  {field.icon && renderIcon(field.icon, "w-4 h-4")}
                  <span>{formData[field.name]}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    dropdownStates[field.name] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownStates[field.name] &&
                field.options &&
                !isFormDisabled && (
                  <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-neutral-200 shadow-lg p-2">
                    {field.options.map((option, optIndex) => {
                      if (typeof option === "string") {
                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() => {
                              handleFieldChange(field.name, option);
                              toggleDropdown(field.name);
                            }}
                            className="w-full p-3 rounded-lg hover:bg-neutral-50 transition-all text-left"
                          >
                            {option}
                          </button>
                        );
                      } else {
                        return (
                          <button
                            key={option.id || optIndex}
                            type="button"
                            onClick={() => {
                              handleFieldChange(
                                field.name,
                                option.id || option.value || option.label
                              );
                              toggleDropdown(field.name);
                            }}
                            className="w-full p-3 rounded-lg hover:bg-neutral-50 transition-all flex items-center gap-3 text-left"
                          >
                            {option.icon && renderIcon(option.icon, "w-5 h-5")}
                            <div>
                              <div className="text-sm font-medium">
                                {option.label}
                              </div>
                              {option.description && (
                                <div className="text-xs text-neutral-500">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      }
                    })}
                  </div>
                )}

              {validationErrors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors[field.name]}
                </p>
              )}
            </div>
          </div>
        );

      case "buttonGroup":
        return (
          <div key={field.name} className="w-full">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex gap-2">
              {field.options &&
                field.options.map((option, optIndex) => {
                  const optionValue =
                    typeof option === "string"
                      ? option
                      : option.id || option.value || option.label;
                  const optionLabel =
                    typeof option === "string" ? option : option.label;
                  const optionWords =
                    typeof option === "string" ? null : option.words;

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() =>
                        !isFormDisabled &&
                        handleFieldChange(field.name, optionValue)
                      }
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all ${
                        formData[field.name] === optionValue
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-neutral-200 hover:border-primary-500/50 text-neutral-600 hover:bg-neutral-50"
                      } ${
                        isFormDisabled ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={isFormDisabled}
                    >
                      {optionLabel}
                      {optionWords && (
                        <span className="block text-xs opacity-75">
                          {optionWords} words
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
            {validationErrors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors[field.name]}
              </p>
            )}
          </div>
        );

      case "counter":
        return (
          <div key={field.name} className="w-full">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (isFormDisabled) return;
                  const currentValue = formData[field.name] || 0;
                  if (field.min === undefined || currentValue > field.min) {
                    handleFieldChange(
                      field.name,
                      currentValue - (field.step || 1)
                    );
                  }
                }}
                className={`p-2 bg-neutral-100 rounded-l-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-200 transition-colors ${
                  isFormDisabled ||
                  (field.min !== undefined && formData[field.name] <= field.min)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  isFormDisabled ||
                  (field.min !== undefined && formData[field.name] <= field.min)
                }
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={formData[field.name] || 0}
                onChange={(e) =>
                  handleFieldChange(field.name, Number(e.target.value))
                }
                min={field.min}
                max={field.max}
                step={field.step || 1}
                className={`w-16 text-center py-2 border-t border-b border-neutral-200 bg-neutral-50 ${
                  isFormDisabled ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isFormDisabled}
              />
              <button
                type="button"
                onClick={() => {
                  if (isFormDisabled) return;
                  const currentValue = formData[field.name] || 0;
                  if (field.max === undefined || currentValue < field.max) {
                    handleFieldChange(
                      field.name,
                      currentValue + (field.step || 1)
                    );
                  }
                }}
                className={`p-2 bg-neutral-100 rounded-r-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-200 transition-colors ${
                  isFormDisabled ||
                  (field.max !== undefined && formData[field.name] >= field.max)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  isFormDisabled ||
                  (field.max !== undefined && formData[field.name] >= field.max)
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {validationErrors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors[field.name]}
              </p>
            )}
          </div>
        );

      case "slider":
        return (
          <div key={field.name} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <span className="text-sm text-neutral-500">
                {formData[field.name] || 0}
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step || 1}
              value={formData[field.name] || 0}
              onChange={(e) =>
                handleFieldChange(field.name, Number(e.target.value))
              }
              className={`w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600 ${
                isFormDisabled ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isFormDisabled}
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>{field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
            {validationErrors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors[field.name]}
              </p>
            )}
          </div>
        );

      case "toggle":
        return (
          <div
            key={field.name}
            className="w-full flex items-center justify-between"
          >
            <label className="text-sm font-medium text-neutral-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <button
              type="button"
              onClick={() =>
                !isFormDisabled &&
                handleFieldChange(field.name, !formData[field.name])
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData[field.name] ? "bg-primary-600" : "bg-neutral-200"
              } ${isFormDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isFormDisabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData[field.name] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 ${className}`}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            {renderIcon(config.headerIcon, "w-5 h-5")}
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">
              {config.formTitle}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-primary-600 text-sm">
              {renderIcon("Sparkles", "w-4 h-4")}
              <span>{config.description}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">
        {config.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {row.fields.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                {renderField(field, fieldIndex)}
              </div>
            ))}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitButtonDisabled()}
          className={`w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            hasSubmitted ? "opacity-50" : ""
          }`}
        >
          {isLoading ? (
            <>
              {renderIcon(
                config.submitButton.loadingIcon,
                "w-4 h-4 animate-spin"
              )}
              <span>{config.submitButton.loadingLabel}</span>
            </>
          ) : (
            <>
              {renderIcon(config.submitButton.icon, "w-4 h-4")}
              <span>
                {hasSubmitted ? "Content Generated" : config.submitButton.label}
              </span>
            </>
          )}
        </button>

        {/* Information message when form is disabled */}
        {hasSubmitted && !isLoading && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-sm text-primary-700 text-center">
              To generate new content, click the "Start New" button at the top
              of the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolForm;
