import { useEffect, useState } from "react";

import CAMPAIGNDATA from "./../data/dummydata.json";
import { getCampaigns } from "../apis/campaign";
import { Search } from "lucide-react";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [originalCampaigns, setOriginalCampaigns] = useState([]);

  useEffect(() => {
    window.addCampaign = function (arr) {
      //  reset the start and end date
      setStartDate("");
      setEndDate("");
      if (Array.isArray(arr)) {
        setCampaigns(arr);
      } else {
        console.error("getData expects an array");
      }
    };
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      console.log(response);
      setCampaigns(CAMPAIGNDATA);
      setOriginalCampaigns(CAMPAIGNDATA);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let filteredCampaigns = [...originalCampaigns];

    if (search) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // If end date is before start date, show no campaigns
    if (startDate && endDate && startDate > endDate) {
      setCampaigns([]);
      return;
    }

    // Apply date filtering
    if (startDate || endDate) {
      filteredCampaigns = filteredCampaigns.filter((campaign) => {
        const campaignStartDate = campaign.startDate;
        const campaignEndDate = campaign.endDate;
        const filterStartDate = startDate || "";
        const filterEndDate = endDate || "";

        // If the campaign's endDate is before the filter's startDate, don't show it
        if (filterStartDate && campaignEndDate < filterStartDate) {
          return false;
        }

        // If the campaign's startDate is contained in the range, it should show
        let isStartInRange = false;
        if (filterStartDate && filterEndDate) {
          isStartInRange =
            campaignStartDate >= filterStartDate &&
            campaignStartDate <= filterEndDate;
        } else if (filterStartDate) {
          // Only start date provided - check if campaign start is on or after filter start
          isStartInRange = campaignStartDate >= filterStartDate;
        } else if (filterEndDate) {
          // Only end date provided - check if campaign start is on or before filter end
          isStartInRange = campaignStartDate <= filterEndDate;
        }

        // If the campaign's endDate is contained in the range, it should show
        let isEndInRange = false;
        if (filterStartDate && filterEndDate) {
          isEndInRange =
            campaignEndDate >= filterStartDate &&
            campaignEndDate <= filterEndDate;
        } else if (filterStartDate) {
          // Only start date provided - check if campaign end is on or after filter start
          isEndInRange = campaignEndDate >= filterStartDate;
        } else if (filterEndDate) {
          // Only end date provided - check if campaign end is on or before filter end
          isEndInRange = campaignEndDate <= filterEndDate;
        }

        return isStartInRange || isEndInRange;
      });
    }

    setCampaigns(filteredCampaigns);
  }, [search, startDate, endDate, originalCampaigns]);

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        {/* input  */}
        <div className="flex items-center justify-between w-full border border-gray-300 rounded px-2 py-2">
          <input
            type="text"
            className="focus:outline-none w-full"
            placeholder="Search campaign"
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(input);
              }
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          {/* lucide search icon */}
          <Search className="text-gray-400" />
        </div>
        {/* date input - start date and end date */}
        <div className="flex gap-2">
          <label htmlFor="start-date" className="self-center">
            Start Date:
          </label>
          <input
            id="start-date"
            type="date"
            placeholder="start date"
            className="border border-gray-300 rounded px-2 py-1"
            value={startDate}
            onChange={(e) => {
              const newStartDate = e.target.value;
              setStartDate(newStartDate);
              // if the new start date is after the end date, reset the end date
              // if (newStartDate && endDate && newStartDate > endDate) {
              //   setEndDate("");
              // }
            }}
          />
          <label htmlFor="end-date" className="self-center">
            End Date:
          </label>
          <input
            id="end-date"
            type="date"
            placeholder="end date"
            className="border border-gray-300 rounded px-2 py-1"
            // min={startDate || undefined}
            value={endDate}
            onChange={(e) => {
              const newEndDate = e.target.value;
              // Prevent selecting an end date before the start date
              // if (startDate && newEndDate && newEndDate < startDate) {
              //   return;
              // }
              setEndDate(newEndDate);
            }}
          />
        </div>
      </div>
      <div>
        {/* table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Campaign Name
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Start Date
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  End Date
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Budget
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">
                    {campaign.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {campaign.startDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {campaign.endDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    $ {campaign.budget}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-[50%] ${
                        campaign.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {campaign.active ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
