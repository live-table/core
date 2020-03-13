import * as Core from ".."
import * as GroupingHelpers from "./grouping"

it("createCustomGroups()", () => {
	const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
	const grouping: Core.CustomGrouping<number> = {
		tests: [
			r => r <= 5,
			r => r <= 8,
			r => r <= 12,
			r => r <= 15,
			r => r > 16
		]
	}

	const groups = GroupingHelpers.createCustomGroups(data, grouping)
	expect(groups).toHaveLength(6)
	expect(groups[0].rows).toHaveLength(5)
	expect(groups[1].rows).toHaveLength(3)
	expect(groups[2].rows).toHaveLength(4)
	expect(groups[3].rows).toHaveLength(3)
	expect(groups[4].rows).toHaveLength(0)
	expect(groups[5].rows).toHaveLength(1)
})

describe("getGroups()", () => {
	let liveTable: Core.LiveTable<number>
	let getGroups: () => Core.Group<number>[]

	beforeEach(() => {
		liveTable = {
			class: "live-table-container",
			getGroups: () => [],
			hasActions: () => true,
			isSearchable: () => true,
			settings: { data: [1, 2, 3, 4, 5] },
			shouldDisplayHeader: () => true,
			table: null
		}

		getGroups = GroupingHelpers.getGroups.bind(liveTable)
	})

	it("without grouping settings", () => {
		expect(getGroups()).toHaveLength(0)
	})

	it("with custom grouping", () => {
		liveTable.settings.grouping = { tests: [] }
		expect(getGroups()).toHaveLength(1)
	})
})

describe("isCustomGrouping()", () => {
	it("should be true", () => {
		const grouping: Core.Grouping<{ id: number }> = {
			tests: [ o => o.id <= 10 ]
		}

		expect(GroupingHelpers.isCustomGrouping(grouping)).toBe(true)
	})

	it("should be false", () => {
		const grouping: Core.Grouping<{ id: number }> = {
			key: "id"
		}

		expect(GroupingHelpers.isCustomGrouping(grouping)).toBe(false)
	})
})
