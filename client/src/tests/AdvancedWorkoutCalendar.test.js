import React from "react";
import { MemoryRouter } from "react-router-dom";
import AdvancedWorkoutCalendar from "../pages/AdvancedWorkoutCalendar";
import { render } from "@testing-library/react";
import moment from "moment";

jest.spyOn(Storage.prototype, "getItem");
Storage.prototype.getItem = jest.fn(() => "123");

global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				workoutLogs: [
					{
						date: moment().format("YYYY-MM-DD"),
						title: "Test Workout",
						startTime: "12:30",
						endTime: "13:30",
						exercises: [],
					},
				],
			}),
	}),
);

test("add workout to calendar and display it on calendar", async () => {
	const { findByText } = render(
		<MemoryRouter>
			<AdvancedWorkoutCalendar />
		</MemoryRouter>,
	);

	const message = await findByText("Test Workout");
	expect(message).toBeInTheDocument();
});