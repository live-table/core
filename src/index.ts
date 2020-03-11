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

/**
 * The specification of an aggregating event handler when data rows are arrays.
 * @typeParam DataRow The type of a row of the array of data.
 */
export interface ArrayRowAggregateEventHandler<DataRow extends unknown[]>
extends BaseAggregateEventHandler<DataRow> {
	/**
	 * Aggregate the values at the `index` of the specified `rows`.
	 * @param rows The data rows to aggregate.
	 * @param index The index of data rows to aggregate.
	 * @typeParam Result The type of the resulting aggregation.
	 */
	<Result extends string | number | boolean>(
		rows: DataRow[],
		index: number
	): Result;
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

export interface ArrayRowCustomGrouping {
	groupBy: ((index: number) => boolean)[]
}

/**
 * The specification of a grouping when data rows are arrays.
 */
export interface ArrayRowKeyGrouping<DataRow extends unknown[]>
extends BaseGrouping<DataRow> {
	/**
	 * The index of data rows used to aggregate them.
	 */
	groupBy: number;
}

/**
 * The base specification of a data rows aggregating event handler.
 * @typeParam DataRow The type of a row of the array of data.
 */
export interface BaseAggregateEventHandler<DataRow> {
	/**
	 * Aggregate the specified `rows`.
	 * @param rows The data rows to aggregate.
	 * @typeParam Result The type of the resulting aggregation.
	 */
	<Result extends string | number | boolean>(rows: DataRow[]): Result;
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
 * The specification of a custom data rows grouping.
 */
export interface ConditionalGrouping<DataRow> extends BaseGrouping<DataRow> {
	/**
	 * The list of filters used to aggregate the data rows.
	 *
	 * Each filter MUST be applied to the rows not satisfying the previous
	 * filters.
	 */
	groupBy: GroupingFilter<DataRow>[];
	/**
	 * Whether the rows not satisfying the filters should be grouped together.
	 *
	 * Its default value MUST be `true`.
	 */
	groupUntreated?: boolean;
}

/**
 * The base specification of a data rows grouping.
 * @typeParam DataRow The type of a row of the array of data.
 */
export interface BaseGrouping<DataRow> {
	/**
	 * Whether the groups should be collapsible.
	 *
	 * Its default value should be `false`.
	 */
	collapsible?: boolean;
	/**
	 * Whether and how the live-table should aggregate rows data in a group
	 * footer.
	 */
	onAggregateFooter?: AggregateEventHandler<DataRow>;
	/**
	 * Whether and how the live-table should aggregate rows data in a group
	 * header.
	 */
	onAggregateHeader?: AggregateEventHandler<DataRow>;
}

export interface GroupingFilter<DataRow> {
	(row: DataRow): boolean;
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
	/**
	 * Original settings used to configure the live-table.
	 */
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

/**
 * The specification of settings used to configure a live-table.
 *
 * An implemenation of {@link LiveTable} should expose this properties to
 * configure it.
 *
 * @example
 * // Exposed as function parameter:
 * function createLiveTable<DataRow>(settings: LiveTableSettings<DataRow>): LiveTable<DataRow>) {
 * 	let liveTable: LiveTable<DataRow>
 * 	// function body
 * 	return liveTable
 * }
 *
 * // Exposed as class constructor parameter:
 * class LiveTableImpl<DataRow> implements LiveTable<DataRow> {
 * 	constructor(settings: LiveTableSettings<DataRow>) {
 * 		// contructor body
 * 	}
 * 	// class body
 * }
 *
 * @typeParam DataRow The type of a row of the array of data.
 */
export interface LiveTableSettings<DataRow> {
	/**
	 * The list of actions to attach to the live-table.
	 */
	actions?: Action[];
	/**
	 * The columns definition.
	 */
	columns?: Columns<DataRow>;
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
	 * Whether and how the data rows should be grouped.
	 */
	grouping?: Grouping<DataRow>;
	/**
	 * The callback function executed each time the user inputs in the search
	 * field.
	 */
	onSearchInput?: SearchEventHandler<DataRow>;
	/**
	 * Whether and how the live-table should display the pagination.
	 */
	pagination?: Pagination;
}

/**
 * The specification of an aggregating event handler when data rows are objects.
 * @typeParam DataRow The type of a row of the array of data.
 */
export interface ObjectRowAggregateEventHandler<DataRow extends object>
extends BaseAggregateEventHandler<DataRow> {
	/**
	 * Aggregate the values of property `data` of the specified `rows`.
	 * @param rows The data rows to aggregate.
	 * @param data The property of data rows to aggregate.
	 * @typeParam Result The type of the resulting aggregation.
	 */
	<Result extends string | number | boolean>(
		rows: DataRow[],
		data: keyof DataRow
	): Result;
}

export interface ObjectRowChildColumn<DataRow extends object>
extends BaseChildColumn {
	data: keyof DataRow;
}

export interface ObjectRowColumnCreator<DataRow extends object> {
	(data: keyof DataRow): ObjectRowChildColumn<DataRow>;
}

/**
 * The specification of a grouping when data rows are objects.
 */
export interface ObjectRowKeyGrouping<DataRow extends object>
extends BaseGrouping<DataRow> {
	/**
	 * The property of data rows used to aggregate them.
	 */
	groupBy: keyof DataRow;
}

/**
 * The specification of a pagination.
 */
export interface Pagination {
	/**
	 * The **zero-base** index of the page to display.<br>
	 * This value should not be negative.
	 *
	 * Default: `0`
	 */
	page?: number;
	/**
	 * The number of rows to display on each page.<br>
	 * This value should not be negative or equal to `0`.
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

export type AggregateEventHandler<DataRow> =
DataRow extends unknown[] ? ArrayRowAggregateEventHandler<DataRow> :
DataRow extends object ? ObjectRowAggregateEventHandler<DataRow> :
BaseAggregateEventHandler<DataRow>

export type ChildColumn<DataRow> =
DataRow extends unknown[] ? ArrayRowChildColumn :
DataRow extends object ? ObjectRowChildColumn<DataRow> :
BaseChildColumn

export type Column<DataRow> = ChildColumn<DataRow> | ParentColumn<DataRow>

export type ColumnCreator<DataRow> =
DataRow extends unknown[] ? ArrayRowColumnCreator :
DataRow extends object ? ObjectRowColumnCreator<DataRow> :
Column<DataRow>

export type Columns<DataRow> =
"auto" |
Column<DataRow>[] |
ColumnCreator<DataRow>

export type Grouping<DataRow> =
ConditionalGrouping<DataRow> |
KeyGrouping<DataRow> |
BaseGrouping<DataRow>

export type KeyGrouping<DataRow> =
DataRow extends unknown[] ? ArrayRowKeyGrouping<DataRow> :
DataRow extends object ? ObjectRowKeyGrouping<DataRow> :
BaseGrouping<DataRow>
