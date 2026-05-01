import { useState, useMemo } from "react";



export function useFiltering<T>(
  items: T[],
  searchFn: (item: T, search: string) => boolean,
  initialFilters: Record<string, string> = {},
) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  const filtered = items.filter((item) => {
    if (search.trim().length > 0 && !searchFn(item, search.trim().toLowerCase())) {
      return false;
    }

    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (filterValue === "all" || filterValue === "") {
        continue;
      }

      const itemValue = (item as Record<string, unknown>)[filterKey];
      if (itemValue !== filterValue) {
        return false;
      }
    }

    return true;
  });

  function setFilter(key: string, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return {
    filtered,
    search,
    setSearch,
    filters,
    setFilter,
  };
}
