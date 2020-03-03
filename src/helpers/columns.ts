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
