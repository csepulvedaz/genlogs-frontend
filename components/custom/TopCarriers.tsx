"use client";

import { useState } from "react";

type Carrier = {
  name: string;
  frequency: number;
};

const mockCarriers: Carrier[] = [
  { name: "Carrier A", frequency: 50 },
  { name: "Carrier B", frequency: 30 },
  { name: "Carrier C", frequency: 20 },
];

const TopCarriers = () => {
  const [carriers] = useState<Carrier[]>(mockCarriers);

  return (
    <ul className="absolute bottom-20 left-2 bg-white p-2 space-y-2">
      <h3 className="text-sm font-bold">Top Carriers</h3>
      {carriers.map((carrier, index) => (
        <li key={index} className="flex items-center text-xs">
          {carrier.name} - {carrier.frequency} trips
        </li>
      ))}
    </ul>
  );
};

export default TopCarriers;
