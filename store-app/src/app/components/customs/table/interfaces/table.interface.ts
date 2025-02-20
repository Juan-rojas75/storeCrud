export interface Column {
    id: number;
    field: string;
    name: string;
}
export interface TableProps {
    columns: Column[];
    paginator: {total: number, page: number, pages: number, items_per_page: number};
    data: any[];
    pageClick: (page: number) => void,
}