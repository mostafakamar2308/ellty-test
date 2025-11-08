import { useCallback } from "react";
import Check from "../svg/Check";
import type { SelectableProps } from "../types/selected";

const Checkbox: React.FC<{
  selected?: boolean;
}> = ({ selected }) => {
  return (
    <div className="checkbox-container">
      <div className="checkbox" data-selected={selected}>
        <Check />
      </div>
    </div>
  );
};

const Selectable: React.FC<{
  data: SelectableProps;
  onSelect: (id: string) => void;
}> = ({ data, onSelect }) => {
  return (
    <button className="selectable-container" onClick={() => onSelect(data.id)}>
      <span className="selectable-label">{data.label}</span>
      <Checkbox selected={data.selected} />
    </button>
  );
};

const MultiSelect: React.FC<{
  data: SelectableProps[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
}> = ({ data, onSelect, onSelectAll }) => {
  const submit = useCallback(() => {
    if (data.every((item) => !item.selected)) {
      return alert("Please select at least one page.");
    }
    alert(
      "Selected pages: " +
        data
          .filter((item) => item.selected)
          .map((item) => item.label)
          .join(", ")
    );
  }, [data]);

  return (
    <div className="multi-select-container">
      <Selectable
        data={{
          id: "0",
          label: "All Pages",
          selected: data.every((item) => item.selected),
        }}
        onSelect={onSelectAll}
      />

      <hr />
      {data.map((item) => (
        <Selectable key={item.id} data={item} onSelect={onSelect} />
      ))}

      <hr />

      <button onClick={submit} className="submit">
        Done
      </button>
    </div>
  );
};

export default MultiSelect;
