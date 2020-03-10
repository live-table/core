import * as Core from ".."

/**
 * Check whether the {@link "index".LiveTable} binded to the `this` parameter is
 * searchable.
 *
 * This helper is provided as a base implementation of
 * {@link "index".LiveTable#isSearchable}
 *
 * @param this The live-table implementation.
 */
export function isSearchable<DataRow>(this: Core.LiveTable<DataRow>): boolean {
	return !!this.settings.onSearchInput
}

/**
 * Check whether the {@link "index".LiveTable} binded to the `this` parameter
 * has at least one {@link "index".Action}.
 *
 * @param this The live-table implementation.
 */
export function hasActions<DataRow>(this: Core.LiveTable<DataRow>): boolean {
	return !!this.settings.actions && this.settings.actions.length > 0
}

/**
 * Check whether the {@link "index".LiveTable} binded to the `this` parameter
 * should display its header.
 *
 * A {@link "index".LiveTable} should display its header if at least one of the
 * following conditions is `true`:
 * * The live-table is searchable.
 * * The live-table has at least one action.
 *
 * @param this The live-table implementation.
 *
 * @see {@link isSearchable}
 * @see {@link hasActions}
 */
export function shouldDisplayHeader<DataRow>(
	this: Core.LiveTable<DataRow>
): boolean {
	return this.isSearchable()
}
