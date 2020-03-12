import * as Core from ".."

export function createCustomGroups<DataRow>(
	data: DataRow[],
	grouping: Core.CustomGrouping<DataRow>
): Core.Group<DataRow>[] {
	const unresolved: Core.Group<DataRow> = { rows: [] }
	const groups = data.reduce<Core.Group<DataRow>[]>(
		(reducedGroups, row) => {
			for (let testIndex = 0; testIndex < grouping.tests.length; testIndex++) {
				const test = grouping.tests[testIndex]

				reducedGroups[testIndex] = reducedGroups[testIndex] || { rows: [] }

				if (test(row)) {
					reducedGroups[testIndex].rows.push(row)
					break
				}

				if (grouping.tests.length - 1 === testIndex) unresolved.rows.push(row)
			}

			return reducedGroups
		},
		[]
	)

	return unresolved.rows.length ? [...groups, unresolved] : groups
}

export function createGroups<DataRow>(
	this: Core.LiveTable<DataRow>
): Core.Group<DataRow>[] {
	if (!this.settings.grouping) return []

	if (isConditionalGrouping(this.settings.grouping))
		return createCustomGroups(this.settings.data, this.settings.grouping)

	return [{ rows: [...this.settings.data] }]
}

export function isConditionalGrouping<DataRow>(
	grouping: Core.Grouping<DataRow>
): grouping is Core.CustomGrouping<DataRow> {
	return undefined !== (grouping as Core.CustomGrouping<DataRow>).tests
}
