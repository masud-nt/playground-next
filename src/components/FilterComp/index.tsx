import React, { useState } from "react";
import Filters from "../Filters/filters";

const FilterComp = () => {
  const [appliedFilters, setAppliedFilter] = useState([]);
  const filters = [
    {
      id: "academic_year",
      label: "Academic Year",
      type: "single",

      options: [
        { id: "323456", label: "Option 1", value: "option1", selected: false },
        { id: "456455", label: "Option 2", value: "option2", selected: false },
        { id: "345645", label: "Option 3", value: "option3", selected: false },
      ],
    },
    {
      id: "tags",
      label: "Tags",
      type: "multiple",

      options: [
        { id: "323456", label: "Option 1", value: "option1", selected: false },
        { id: "456455", label: "Option 2", value: "option2", selected: false },
        { id: "345645", label: "Option 3", value: "option3", selected: false },
      ],
    },
  ];
  const onClick = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Filters
        appliedFilters={appliedFilters}
        filters={filters}
        onClick={onClick}
      />
      <div className="p-8">Content</div>
    </div>
  );
};

export default FilterComp;
