import * as ClassNames from "./class-names"
import * as ColumnsHelpers from "./helpers/columns"

export {
	ClassNames,
	ColumnsHelpers
}

export interface BaseColumn {
	/** The label to display. */
	label: string;
	/**
	 * The text to display as a tooltip on mouse over.<br>
	 * If undefined, the live-table should display the label as tooltip.
	 */
	title?: string;
}

export interface ChildColumn<TDataRow> extends BaseColumn {
	data: ColumnKey<TDataRow>;
}

export interface ColumnCreator<TDataRow> {
	(colIndex: number): Column<TDataRow>
}

export interface ProceduralColumns<TDataRow> {
	count: number;
	createColumn: ColumnCreator<TDataRow>;
}

/**
 * The base specification of a live-table.
 * @typeParam TDataRow The type of a data row.
 */
export interface LiveTable<TDataRow> {
	columns?: ColumnsOption<TDataRow>;
	/** The data to display in the live-table. */
	data: TDataRow[];
	/** Whether the live-table has to display the pagination. */
	pagination?: PaginationOption;
	/** Whether the live-table has to display the search area. */
	search?: SearchOption<TDataRow>;
	/** The real table of the live-table. */
	table: Table<TDataRow> | null;
}

/**
 * The specification of a pagination.
 */
export interface PaginationOption {
	/**
	 * The **zero-base** index of the page to display.<br>
	 * This value should not be negative.
	 */
	page?: number;
	/**
	 * The number of rows to display on each page.<br>
	 * This value should not be less or equal to `0`.
	 */
	rowsCount: number;
}

/**
 * The specification of a column nesting columns.
 */
export interface ParentColumn<TDataRow> extends BaseColumn {
	columns: Column<TDataRow>[];
}

/**
 * The specification of a search option.
 * @typeParam TDataRow The type of a data row.
 */
export interface SearchOption<TDataRow> {
	/**
	 * @param input The search input.
	 * @param data The data displayed in the live-table.
	 * @returns The filtered data matching the
	 */
	(input: string, data: TDataRow[]): TDataRow[];
}

/**
 * The specification of a table.
 * @typeParam TDataRow The type of a data row.
 */
export interface Table<TDataRow> {
	/** The last descendant columns. */
	columns: ChildColumn<TDataRow>[];
	/** The implementation of {@link Core<TDataRow>} nesting this table. */
	liveTable: LiveTable<TDataRow>;
}

export type Column<TDataRow> = ChildColumn<TDataRow> | ParentColumn<TDataRow>
export type ColumnKey<TDataRow> =
TDataRow extends unknown[] ? number :
TDataRow extends object ? keyof TDataRow :
undefined
export type ColumnsOption<TDataRow> = Column<TDataRow>[] | ProceduralColumns<TDataRow>
