interface FilterItem {
  title: string;
  quantity: number;
  checked?: boolean;
  query: string[];
}

interface Filter {
  name: string;
  fieldname: string;
  operator: string[];
  items: FilterItem[];
}

export type { Filter, FilterItem };
