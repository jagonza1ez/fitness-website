import React from "react";
import { MemoryRouter } from "react-router-dom";
import AddFriends from "../pages/AddFriends";
import { render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "getItem");
Storage.prototype.getItem = jest.fn(() => "123");

global.fetch = jest.fn((url) => {
	if (url.includes("/auth/users")) {
		return Promise.resolve({
			ok: true,
			json: () =>
				Promise.resolve([
					{
						_id: "123",
						name: "Matthew",
						username: "Matthew",
					},
				]),
		});
	} else if (url.includes("add-friend")) {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ message: "Friend added" }),
		});
	}
});

test("add friend", async () => {
	const { findByText } = render(
		<MemoryRouter>
			<AddFriends />
		</MemoryRouter>,
	);

	const message = await findByText("Matthew");
	expect(message).toBeInTheDocument();
});
