import React, { ChangeEvent } from "react";
import { FeedbackItem } from "./FeedbackForm"; // Assuming FeedbackItem is exported from FeedbackForm or a shared types file

// Define the props for the FilterSortControls component
interface FilterSortControlsProps {
  categories: FeedbackItem["category"][];
  selectedCategory: string; // Can be empty for "All"
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}) => {
  const sortOptions: { value: string; label: string }[] = [
    { value: "recent", label: "Most Recent" },
    { value: "mostUpvoted", label: "Most Upvoted" },
  ];

  return (
    <div className="mb-6 p-4 bg-neutral-light rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
        <label
          htmlFor="category-filter"
          className="block text-sm font-medium text-neutral-dark mb-1 sm:mb-0 sm:mr-2"
        >
          Filter by Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onCategoryChange(e.target.value)
          }
          className="input-field bg-white py-2 text-sm w-full sm:w-auto "
        >
          <option value="" className="text-black bg-white">
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize text-black">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label
          htmlFor="sort-by"
          className="block text-sm font-medium text-neutral-dark mb-1 sm:mb-0 sm:mr-2"
        >
          Sort by:
        </label>
        <select
          id="sort-by"
          value={selectedSort}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onSortChange(e.target.value)
          }
          className="input-field py-2  text-sm w-full sm:w-auto"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;
