import { render, screen } from "../../../test-utils/test-library-utils";

import userEvent from "@testing-library/user-event";

import ScoopOptions from "../ScoopOptions";

test("indicate if scoop count is non-int or out of range", async () => {
  const user = userEvent.setup();
  render(<ScoopOptions />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with input that´s too high
  await user.click(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with invalid input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
