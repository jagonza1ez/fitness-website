import React from "react";
import { MemoryRouter } from "react-router-dom";
import UserHomepage from "../pages/UserHomepage";
import { fireEvent, render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "getItem");
Storage.prototype.getItem = jest.fn(() =>
	JSON.stringify({
		name: "Matthew",
		aboutMe: "Hey there",
	}),
);

test("view profile page", async () => {
	const { findByText } = render(
		<MemoryRouter>
			<UserHomepage />
		</MemoryRouter>,
	);

	const name = await findByText("Matthew");
	expect(name).toBeInTheDocument();

	const aboutMe = await findByText("Hey there");
	expect(aboutMe).toBeInTheDocument();
});

test("logout", async () => {
	const { findByText } = render(
		<MemoryRouter>
			<UserHomepage />
		</MemoryRouter>,
	);

	const logOutButton = await findByText("Logout");
	fireEvent.click(logOutButton);
});
