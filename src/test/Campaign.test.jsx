import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getCampaigns } from "../apis/campaign";
import CAMPAIGNDATA from "../data/dummydata.json";
import Campaigns from "../components/Campaigns";

vi.mock("../apis/campaign", () => ({
  getCampaigns: vi.fn(() => Promise.resolve([]))
}));

test("shows loading skeleton initially", async () => {
  render(<Campaigns />);

  expect(screen.getByTestId("loader")).toBeInTheDocument();
});

test("displays campaigns after fetching", async () => {
  getCampaigns.mockResolvedValueOnce(CAMPAIGNDATA);

  render(<Campaigns />);

  await waitFor(() =>
    expect(screen.getByText(CAMPAIGNDATA[0].name)).toBeInTheDocument()
  );
});

test("filters campaigns by search input", async () => {
  render(<Campaigns />);

  await waitFor(() => expect(screen.getByText(/Divavu/i)).toBeInTheDocument());

  const input = screen.getByPlaceholderText(/Search campaign/i);

  await userEvent.type(input, "divavu{enter}");

  expect(screen.getByText(/Divavu/i)).toBeInTheDocument();
  expect(screen.queryByText(/Jaxspan/i)).not.toBeInTheDocument();
});

test("incorrect date range filters campaigns", async () => {
  render(<Campaigns />);

  await waitFor(() => expect(screen.getByText(/Divavu/i)).toBeInTheDocument());

  const start = screen.getByLabelText(/Start Date/i);
  const end = screen.getByLabelText(/End Date/i);

  await userEvent.type(start, "2025-11-20");
  await userEvent.type(end, "2025-11-10");

  expect(screen.getByText(/No campaigns found/i)).toBeInTheDocument();
});

test("addCampaign updates campaigns", async () => {
  render(<Campaigns />);

  await waitFor(() => expect(screen.getByText(/Divavu/i)).toBeInTheDocument());

  globalThis.addCampaign([
    {
      id: 999,
      name: "Test Campaign",
      startDate: "2025-11-15",
      endDate: "2025-11-20",
      budget: 100,
      active: true
    }
  ]);

  expect(await screen.findByText(/Test Campaign/i)).toBeInTheDocument();
});
