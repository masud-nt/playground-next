import { Disclosure } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { Filter, FilterOption } from "./FilterTypes";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface FilterOptionField {
  filter: Filter;
}

function FilterOptionField({ filter }: FilterOptionField) {
  if (filter.type === "single") {
    return <SingleSelect filter={filter} />;
  } else if (filter.type === "multiple") {
    return <MultiSelect filter={filter} />;
  } else return <></>;
}

function SingleSelect({ filter }: FilterOptionField) {
  return (
    <div>
      <label
        htmlFor={filter.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {filter.label}
      </label>
      <select
        id={filter.id}
        name={filter.id}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pt-green-dark sm:text-sm sm:leading-6"
        defaultValue={filter.selected}
      >
        <option value={""}>{`Select ${filter.label}`}</option>
        {filter.options.map((option: FilterOption, optionIdx: number) => (
          <option key={optionIdx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiSelect({ filter }: FilterOptionField) {
  return (
    <fieldset>
      <legend className="block font-medium">{filter.label}</legend>
      <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
        {filter.options.map((option: FilterOption, optionIdx: number) => (
          <div
            key={option.value}
            className="flex items-center text-base sm:text-sm"
          >
            <input
              id={`${filter.id}-${optionIdx}`}
              name={`${filter.id}[]`}
              defaultValue={option.value}
              type="checkbox"
              className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-pt-green-dark focus:ring-pt-green-dark"
              defaultChecked={option.selected}
            />
            <label
              htmlFor={`${filter.id}-${optionIdx}`}
              className="ml-3 min-w-0 flex-1 text-gray-600"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default function ReportFilter({
  filters = [],
  filterCount = 0,
}: {
  filters: Filter[];
  filterCount: number;
}) {
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const { pathname, basePath } = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoadingModal(true);
    const target: HTMLFormElement = e.currentTarget;
    let query = new URLSearchParams();

    filters.forEach((filter) => {
      if (filter.type === "readOnly" && filter.selected) {
        query.set(filter.id, filter.selected.toString());
      } else if (filter.type === "single") {
        const value = (
          target.querySelector(
            `select[name="${filter.id}"]`
          ) as HTMLSelectElement
        ).value;

        if (value && value.length) query.set(filter.id, value);
      } else {
        const checked: NodeListOf<HTMLInputElement> = target.querySelectorAll(
          `input[name="${filter.id}"]:checked`
        );

        checked.forEach((element: HTMLInputElement) => {
          if (element.value && element.value.length)
            query.append(`${filter.id}`, element.value);
        });
      }
    });

    window.location.href = `${basePath}${pathname}?${query.toString()}`;
  };

  const onClear = () => {
    setShowLoadingModal(true);
    window.location.href = `${basePath}${pathname}`;
  };

  return (
    <div className="bg-white print:hidden">
      {/* {showLoadingModal ? (
        <LoadingModal message="Applying filters to your report" />
      ) : null} */}
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {filterCount ? `${filterCount} filters` : "Filter"}
              </Disclosure.Button>
            </div>
            {filterCount ? (
              <div className="pl-6">
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={onClear}
                >
                  Clear all
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          {({ close }) => (
            <form onSubmit={onSubmit}>
              <div className="mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6">
                  {filters.map((filter: Filter, index: number) => (
                    <FilterOptionField filter={filter} key={index} />
                  ))}
                </div>
              </div>

              <hr className="my-9" />

              <div className="pl-6 pb-0 flex items-center justify-start gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-pt-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pt-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-green-dark"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
