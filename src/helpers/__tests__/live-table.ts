import * as Core from "../.."
import * as LiveTableHelpers from "../live-table"

let liveTable: Core.LiveTable<{}>
let isSearchable: () => boolean
let hasActions: () => boolean
let shouldDisplayHeader: () => boolean

beforeEach(() => {
	liveTable = {
		class: "live-table-container",
		getGroups: () => [],
		hasActions: () => hasActions(),
		isSearchable: () => isSearchable(),
		settings: { data: [] },
		shouldDisplayHeader: () => shouldDisplayHeader(),
		table: null
	}

	hasActions = LiveTableHelpers.hasActions.bind(liveTable)
	isSearchable = LiveTableHelpers.isSearchable.bind(liveTable)
	shouldDisplayHeader = LiveTableHelpers.shouldDisplayHeader.bind(liveTable)
})

describe("hasActions()", () => {
	it("with at least one action should be true", () => {
		liveTable.settings.actions = [{
			label: "Test",
			onClick: () => {}
		}]
		expect(hasActions()).toBe(true)
	})

	it("with undefined actions should be false", () => {
		expect(hasActions()).toBe(false)
	})

	it("with no action should be false", () => {
		liveTable.settings.actions = []
		expect(hasActions()).toBe(false)
	})
})

describe("isSearchable()", () => {
	it("with search callback should be true", () => {
		liveTable.settings.onSearchInput = (input, data) => data
		expect(isSearchable()).toBe(true)
	})

	it("without search callback should be false", () => {
		expect(isSearchable()).toBe(false)
	})
})

describe("shouldDisplayHeader()", () => {
	const hasActionsMock = jest.fn<boolean, any[]>()
	const isSearchableMock = jest.fn<boolean, any[]>()

	it("having action but being not searchable should be true", () => {
		liveTable.hasActions = hasActionsMock.mockReturnValue(true)
		liveTable.isSearchable = isSearchableMock.mockReturnValue(false)

		expect(shouldDisplayHeader()).toBe(true)
	})

	it("being searchable but having no action should be true", () => {
		liveTable.hasActions = hasActionsMock.mockReturnValue(false)
		liveTable.isSearchable = isSearchableMock.mockReturnValue(true)

		expect(shouldDisplayHeader()).toBe(true)
	})

	it("having action and being searchable should be true", () => {
		liveTable.hasActions = hasActionsMock.mockReturnValue(true)
		liveTable.isSearchable = isSearchableMock.mockReturnValue(true)

		expect(shouldDisplayHeader()).toBe(true)
	})

	it("having no action and being not searchable should be false", () => {
		liveTable.hasActions = hasActionsMock.mockReturnValue(false)
		liveTable.isSearchable = isSearchableMock.mockReturnValue(false)

		expect(shouldDisplayHeader()).toBe(false)
	})
})
