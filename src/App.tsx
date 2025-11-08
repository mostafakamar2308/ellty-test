import { useCallback, useState } from "react";
import "./App.css";
import Check from "./svg/Check";

type SelectableProps = {
  id: string;
  label: string;
  selected?: boolean;
};

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

const App: React.FC = () => {
  const [data, setData] = useState<SelectableProps[]>([
    { id: "1", label: "Page 1", selected: false },
    { id: "2", label: "Page 2", selected: false },
    { id: "3", label: "Page 3", selected: true },
    { id: "4", label: "Page 4", selected: false },
  ]);

  const onSelect = useCallback((id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const onSelectAll = useCallback(() => {
    setData((prev) =>
      prev.every((item) => item.selected)
        ? prev.map((item) => ({ ...item, selected: false }))
        : prev.map((item) => ({ ...item, selected: true }))
    );
  }, []);

  return (
    <MultiSelect data={data} onSelect={onSelect} onSelectAll={onSelectAll} />
  );
};

export default App;
