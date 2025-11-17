import React, { useEffect, useState } from "react";
import { getCampaigns } from "../apis/campaign";

export default function WindowData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.getData = function (arr) {
      if (Array.isArray(arr)) {
        setData(arr);
      } else {
        console.error("getData expects an array");
      }
    };
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
