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

/** The specification of a child column when data rows are arrays. */
export interface ArrayRowChildColumn extends BaseChildColumn {
	/** The index of the data row item. */
	index: number;
}

/** The specification of a column creator when data rows are arrays. */
export interface ArrayRowColumnCreator {
	/**
	 * Create a {@link ArrayRowChildColumn} for the specified `index`.
	 *
	 * When columns are created, the program loops over the items of the first
	 * data row and calls this function on each iteration passing the current
	 * index to the parameter `index`.
	 *
	 * @param index The index of the column.
	 */
	(index: number): ArrayRowChildColumn;
}

export interface BaseChildColumn extends BaseColumn {
	/**
	 * Whether cells of the column are editable or not.
	 *
	 * The default value MUST be `false` and, if defined, MUST override the value
	 * of {@link LiveTable.editable}.
	 */
	editable?: boolean;
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

/**
 * The base specification of a live-table.
 * @typeParam DataRow The type of a data row.
 */
export interface LiveTable<DataRow> {
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
	settings: LiveTableSettings<DataRow>;
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

export interface LiveTableSettings<DataRow> {
	actions?: Action[];
	/**
	 * The columns definition.
	 */
	columns?: ColumnsOption<DataRow>;
	/**
	 * The data to pass to the the {@link LiveTable}.
	 */
	data: DataRow[];
	/**
	 * Whether the cells of the table are editable.
	 *
	 * The default value MUST be `false`.
	 */
	editable?: boolean;
	/**
	 * The callback function executed each time the user inputs in the search
	 * field.
	 */
	onSearchInput?: SearchEventHandler<DataRow>;
	/**
	 * Whether the live-table has to display the pagination.
	 */
	pagination?: PaginationOption;
}

export interface ObjectRowChildColumn<DataRow extends object>
extends BaseChildColumn {
	data: keyof DataRow;
}

export interface ObjectRowColumnCreator<DataRow extends object> {
	(data: keyof DataRow): ObjectRowChildColumn<DataRow>;
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
 * The specification of a search event handler function.
 * @typeParam DataRow The type of a data row.
 */
export interface SearchEventHandler<DataRow> {
	/**
	 * @param input The search input.
	 * @param data The data displayed in the live-table.
	 * @returns The filtered data matching the input.
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

export type ChildColumn<DataRow> =
DataRow extends unknown[] ? ArrayRowChildColumn :
DataRow extends object ? ObjectRowChildColumn<DataRow> :
BaseChildColumn

export type Column<DataRow> = ChildColumn<DataRow> | ParentColumn<DataRow>

export type ColumnCreator<DataRow> =
DataRow extends unknown[] ? ArrayRowColumnCreator :
DataRow extends object ? ObjectRowColumnCreator<DataRow> :
Column<DataRow>

export type ColumnsOption<DataRow> =
Column<DataRow>[] |
ColumnCreator<DataRow>
