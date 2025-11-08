import { useCallback, useState } from "react";
import "./App.css";
import type { SelectableProps } from "./types/selected";
import MultiSelect from "./components/MultiSelect";

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
