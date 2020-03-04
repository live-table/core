import * as ClassNames from "./class-names"
import * as ColumnsHelpers from "./helpers/columns"
import * as LiveTableHelpers from "./helpers/live-table"

export {
	ClassNames,
	ColumnsHelpers,
	LiveTableHelpers
}

/**
 * The specification of an action generaly represented by a button.
 */
export interface Action {
	/** The text to display in the button. */
	label: string;
	/**
	 * The text to display as a tooltip on mouse over.
	 *
	 * If undefined, the live-table should display the label as tooltip.
	 */
	title?: string;
	/**
	 * The callback function executed when the user clicks the button.
	 */
	onClick(): void;
}

export interface BaseColumn {
	/** The label to display. */
	label: string;
	/**
	 * The text to display as a tooltip on mouse over.
	 *
	 * If undefined, the live-table should display the label as tooltip.
	 */
	title?: string;
}

export interface ChildColumn<DataRow> extends BaseColumn {
	data: ColumnKey<DataRow>;
}

export interface ColumnCreator<DataRow> {
	(colIndex: number): Column<DataRow>
}

export interface ProceduralColumns<DataRow> {
	count: number;
	createColumn: ColumnCreator<DataRow>;
}

/**
 * The base specification of a live-table.
 * @typeParam TDataRow The type of a data row.
 */
export interface LiveTable<DataRow> {
	actions?: Action[];
	/** The columns definition. */
	columns?: ColumnsOption<DataRow>;
	/** The data to display in the live-table. */
	data: DataRow[];
	/**
	 * Check whether the implementation has actions.
	 *
	 * This function can return the result of the helper
	 * {@link "helpers/live-table".hasActions} binding the `this` parameter to the
	 * implementation of {@link LiveTable}.
	 */
	hasActions(): boolean;
	/**
	 * Check whether the implementation is searchable.
	 *
	 * This function can return the result of the helper
	 * {@link "helpers/live-table".isSearchable} binding the `this` parameter to the
	 * implementation of {@link LiveTable}.
	 */
	isSearchable(): boolean;
	/** Whether the live-table has to display the pagination. */
	pagination?: PaginationOption;
	/** Whether the live-table has to display the search area. */
	search?: SearchOption<DataRow>;
	/**
	 * Check whether the implementation should display its header.
	 *
	 * This function can return the result of the helper
	 * {@link "helpers/live-table".shouldDisplayHeader} binding the `this`
	 * parameter to the implementation of {@link LiveTable}.
	 */
	shouldDisplayHeader(): boolean;
	/** The real table of the live-table. */
	table: Table<DataRow> | null;
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
export interface ParentColumn<DataRow> extends BaseColumn {
	columns: Column<DataRow>[];
}

/**
 * The specification of a search option.
 * @typeParam TDataRow The type of a data row.
 */
export interface SearchOption<DataRow> {
	/**
	 * @param input The search input.
	 * @param data The data displayed in the live-table.
	 * @returns The filtered data matching the
	 */
	(input: string, data: DataRow[]): DataRow[];
}

/**
 * The specification of a table.
 * @typeParam TDataRow The type of a data row.
 */
export interface Table<DataRow> {
	/** The last descendant columns. */
	columns: ChildColumn<DataRow>[];
	/** The implementation of {@link Core<TDataRow>} nesting this table. */
	liveTable: LiveTable<DataRow>;
}

export type Column<DataRow> = ChildColumn<DataRow> | ParentColumn<DataRow>
export type ColumnKey<DataRow> =
DataRow extends unknown[] ? number :
DataRow extends object ? keyof DataRow :
undefined
export type ColumnsOption<DataRow> = Column<DataRow>[] | ProceduralColumns<DataRow>
