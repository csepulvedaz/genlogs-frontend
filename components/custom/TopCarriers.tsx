import { Carrier } from "@/types/carrierTypes";

type TopCarriersProps = {
  carriers: Carrier[];
};

const TopCarriers = ({carriers}: TopCarriersProps) => {

  return (
    <ul className="absolute bottom-32 lg:bottom-28 left-7 lg:left-2 bg-white p-2 space-y-2">
      <h3 className="text-sm font-bold">Top Carriers</h3>
      {carriers.map((carrier, index) => (
        <li key={index} className="flex items-center text-xs">
          <b>{index+1}</b>. {carrier.name} - {carrier.trucks_per_day} trucks/day
        </li>
      ))}
    </ul>
  );
};

export default TopCarriers;
