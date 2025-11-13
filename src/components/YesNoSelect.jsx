import React from "react";

export default function YesNoSelect({ value, onChange }) {
  const handleChange = (e) => {
    // Convertimos a booleano
    const val = e.target.value === "true";
    onChange(val);
  };

  return (
    <select
      value={value === null ? "" : value.toString()}
      onChange={handleChange}
      className="border rounded px-2 py-1 w-full"
    >
      <option value="">Seleccioná...</option>
      <option value="true">Sí</option>
      <option value="false">No</option>
    </select>
  );
}
