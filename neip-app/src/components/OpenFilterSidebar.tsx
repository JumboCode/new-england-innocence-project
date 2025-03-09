import React, { useState } from "react";
import Image from "next/image";
import { FormControl, Select, MenuItem } from "@mui/material";
import XlCoseIcon from "../img/close.png";
import AndOr from "./AndOr";
import FilterSelection from "./FilterSelection";

interface OpenFilterSidebarProps {
  onClose: () => void;
}

const OpenFilterSidebar: React.FC<OpenFilterSidebarProps> = ({ onClose }) => {
  const [filters, setFilters] = useState<
    Array<{ id: number; label: string; field: string; condition: string; tags: string[] }>
  >([]);
  const [logic, setLogic] = useState<("AND" | "OR")[]>([]);
  const [selectedField, setSelectedField] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  const dataFields = [
    { value: 'name', label: 'Name' },
    { value: 'dob', label: 'Date of birth' },
    { value: 'gender', label: 'Gender' },
    { value: 'race', label: 'Race' },
    { value: 'ethnicity', label: 'Ethnicity' },
    { value: 'phoneNumber', label: 'Phone number' },
    { value: 'address', label: 'Address' },
    { value: 'email', label: 'Email' },
    { value: 'caseNumber', label: 'Case number' },
    { value: 'jurisdiction', label: 'Jurisdiction' },
    { value: 'exonerationNumber', label: 'Exoneration number' },
    { value: 'yearsInPrison', label: 'Years in prison' },
    { value: 'arrestDate', label: 'Arrest date' },
    { value: 'freedomDate', label: 'Freedom date' },
    { value: 'exonerationDate', label: 'Exoneration date' },
    { value: 'crimeType', label: 'Crime type' },
    { value: 'sentence', label: 'Sentence' },
    { value: 'originalCharges', label: 'Original charges' },
    { value: 'convictionMethod', label: 'Conviction method' },
    { value: 'exonerationMethod', label: 'Exoneration method' },
    { value: 'legalRepresentation', label: 'Legal representation' },
    { value: 'prosecutor', label: 'Prosecutor' },
    { value: 'judge', label: 'Judge' },
    { value: 'officersInvolved', label: 'Officers involved' },
    { value: 'falseConfession', label: 'False confession' },
    { value: 'eyewitnessMisidentification', label: 'Eyewitness misidentification' },
    { value: 'inadequateLegalDefense', label: 'Inadequate legal defense' },
    { value: 'policeMisconduct', label: 'Police misconduct' },
    { value: 'prosecutorialMisconduct', label: 'Prosecutorial misconduct' },
    { value: 'forensicEvidence', label: 'Forensic Evidence' },
    { value: 'informantTestimony', label: 'Informant testimony' },
    { value: 'otherInfo', label: 'Other info' },
    { value: 'compensation', label: 'Compensation' },
    { value: 'reentrySupport', label: 'Reentry support' },
    { value: 'publicApology', label: 'Public apology' },
    { value: 'currentStatus', label: 'Current status' },
    { value: 'mediaCoverage', label: 'Media coverage' },
    { value: 'advocacyInvolvement', label: 'Advocacy involvement' },
    { value: 'educationalBackground', label: 'Educational background' },
    { value: 'healthInfo', label: 'Health info' },
    { value: 'dataSource', label: 'Data source' },
    { value: 'lastUpdated', label: 'Last updated' },
    { value: 'createdAt', label: 'Created at' }
  ]

  // Add a new filter based on the selected field value
  const addFilter = (fieldValue: string) => {
    const fieldObject = dataFields.find((field) => field.value === fieldValue);
    if (!fieldObject) return;
    const newFilter = {
      id: Date.now(),
      field: fieldObject.value,
      label: fieldObject.label,
      condition: "is", // default condition
      tags: [] // initial tags array for this filter
    };
    setFilters((prev) => [...prev, newFilter]);
    if (filters.length > 0) {
      setLogic((prev) => [...prev, "AND"]);
    }
    // Reset the selected field so that the dropdown displays the placeholder
    setSelectedField("");
  };

  const removeFilter = (id: number) => {
    const index = filters.findIndex((f) => f.id === id);
    setFilters(filters.filter((f) => f.id !== id));
    setLogic(logic.filter((_, i) => i !== index - 1));
  };

  const updateLogic = (index: number, value: "AND" | "OR") => {
    const newLogic = [...logic];
    newLogic[index] = value;
    setLogic(newLogic);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const fieldValue = event.target.value as string;
    setSelectedField(fieldValue);
    addFilter(fieldValue);
    setSelectOpen(false);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg flex flex-col z-50">
      {/* Header */}
      <div className="bg-[#0F6A9A] text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Add filters</h2>
        <button onClick={onClose} className="p-2">
          <Image src={XlCoseIcon} alt="close" width={16} height={16} />
        </button>
      </div>

      {/* Filter Selection Section using MUI Select */}
      <div className="p-4 border-b border-gray-300 bg-[#0F6A9A]">
        <FormControl fullWidth>
          <Select
            value={selectedField}
            open={selectOpen}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            onChange={handleSelectChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a filter
            </MenuItem>
            {dataFields.map((field) => (
              <MenuItem key={field.value} value={field.value}>
                {field.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Filters List */}
      <div className="flex-grow p-4 overflow-y-auto bg-[#e6e6e6]">
        {filters.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No Filter Selected</p>
            <p>Please choose a filter above to refine your search.</p>
          </div>
        ) : (
          <div>
            <h3 className="font-bold mb-2 text-black-100">Filters</h3>
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex flex-col items-center space-y-2">
                {index > 0 && (
                  <AndOr
                    value={logic[index - 1]}
                    onChange={(value) => updateLogic(index - 1, value)}
                  />
                )}
                <FilterSelection
                  title={filter}
                  condition={filter.condition}
                  setCondition={(newCondition) =>
                    setFilters(
                      filters.map((f) =>
                        f.id === filter.id ? { ...f, condition: newCondition } : f
                      )
                    )
                  }
                  tags={filter.tags}
                  setTags={(newTags) =>
                    setFilters(
                      filters.map((f) =>
                        f.id === filter.id ? { ...f, tags: newTags } : f
                      )
                    )
                  }
                  onRemove={removeFilter}
                />
              </div>
            ))}
          </div>
        )}

        {/* "+ Filter" Button at the bottom opens the dropdown */}
        <div className="mt-4">
          <button
            onClick={() => setSelectOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            + Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenFilterSidebar;
