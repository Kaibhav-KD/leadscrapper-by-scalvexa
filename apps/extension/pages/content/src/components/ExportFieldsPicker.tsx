import { twMerge } from 'tailwind-merge';

import {
  DATA_EXPORT_BASIC_FIELDS,
  DATA_EXPORT_FIELDS_SELECT,
} from '@chrome-extension/shared/enums';

const LOCATION_FIELD_VALUES = new Set([
  'latitude',
  'longitude',
  'address',
  'street',
  'municipality',
]);

type ExportFieldsPickerProps = {
  selected: string[];
  collectLocation?: boolean;
  onChange: (fields: string[]) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export const ExportFieldsPicker = ({
  selected,
  collectLocation = true,
  onChange,
  collapsed = false,
  onToggleCollapse,
}: ExportFieldsPickerProps) => {
  const options = DATA_EXPORT_FIELDS_SELECT.filter(item =>
    collectLocation ? true : !LOCATION_FIELD_VALUES.has(item.value),
  );

  const selectedSet = new Set(selected);
  const selectedCount = options.filter(item => selectedSet.has(item.value)).length;

  const toggle = (value: string) => {
    if (selectedSet.has(value)) {
      onChange(selected.filter(field => field !== value));
      return;
    }
    onChange([...selected, value]);
  };

  const selectBasics = () => {
    const basics = DATA_EXPORT_BASIC_FIELDS.filter(field =>
      collectLocation ? true : !LOCATION_FIELD_VALUES.has(field),
    );
    onChange(basics);
  };

  const selectAll = () => {
    onChange(options.map(item => item.value));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 p-2">
      <button
        type="button"
        className="w-full flex flex-row items-center justify-between text-left"
        onClick={onToggleCollapse}>
        <span className="text-xs font-semibold text-neutral-800">
          Fields to export ({selectedCount}/{options.length})
        </span>
        <span className="text-[11px] text-neutral-500">{collapsed ? 'Show' : 'Hide'}</span>
      </button>

      {!collapsed && (
        <>
          <p className="text-[11px] text-neutral-500 leading-snug">
            Pick what to include in your file — name, location, rating, phone, and more.
          </p>
          <div className="flex flex-row flex-wrap gap-1">
            <PresetButton onClick={selectBasics}>Basics</PresetButton>
            <PresetButton onClick={selectAll}>All</PresetButton>
            <PresetButton onClick={clearAll}>Clear</PresetButton>
          </div>
          <div className="max-h-[148px] overflow-y-auto pr-0.5">
            <div className="flex flex-row flex-wrap gap-1">
              {options.map(({ value, label }) => {
                const checked = selectedSet.has(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggle(value)}
                    className={twMerge(
                      'px-1.5 h-[22px] rounded text-[11px] leading-none border cursor-pointer',
                      checked
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500',
                    )}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          {selectedCount === 0 && (
            <span className="text-[11px] text-amber-700">Select at least one field before exporting.</span>
          )}
        </>
      )}
    </div>
  );
};

const PresetButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="px-1.5 h-[20px] rounded text-[10px] font-medium bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer">
    {children}
  </button>
);
