import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedTag, setSelectedTag] = useState("");

  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Framework List with Search & Filter
      </h1>

      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        value={dataForm.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <select
        name="selectedTag"
        value={dataForm.selectedTag}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="space-y-4">
        {filteredFrameworks.map((framework, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{framework.name}</h2>
            <p className="text-gray-600">{framework.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {framework.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
