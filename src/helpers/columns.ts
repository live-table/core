import * as Core from ".."

/**
 * Check whether the specified column is a parent one.
 * @param column
 */
export function isParent<DataRow>(
	column: Core.Column<DataRow>
): column is Core.ParentColumn<DataRow> {
	return undefined !== (column as Core.ParentColumn<DataRow>).columns
}

/**
 * Check whether the specified column is a child one.
 *
 * Formally, check whether the specified column is not a parent one.
 *
 * @param column
 *
 * @see {@link isParent}
 */
export function isChild<DataRow>(
	column: Core.Column<DataRow>
): column is Core.ChildColumn<DataRow> {
	return !isParent(column)
}
