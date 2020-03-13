import * as Core from "../.."
import { isParent, isChild } from "../columns"

const childColumn: Core.Column<Foo> = {
	key: "id",
	label: "Child column"
}

const parentColumn: Core.Column<Foo> = {
	columns: [],
	label: "Parent column"
}

describe("isParent()", () => {
	it("should be false", () => {
		expect(isParent(childColumn)).toBe(false)
	})

	it("should be true", () => {
		expect(isParent(parentColumn)).toBe(true)
	})
})

describe("isChild()", () => {
	it("should be false", () => {
		expect(isChild(parentColumn)).toBe(false)
	})

	it("should be true", () => {
		expect(isChild(childColumn)).toBe(true)
	})
})

interface Foo {
	id: number;
}
