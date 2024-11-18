import { Carrier } from "@/types/carrierTypes";

type TopCarriersProps = {
  carriers: Carrier[];
};

const TopCarriers = ({carriers}: TopCarriersProps) => {

  return (
    <ul className="relative sm:absolute sm:bottom-28 sm:left-2 mt-3 sm:mt-0 bg-white p-2 space-y-2">
      <h3 className="text-sm font-bold mb-3 sm-mb-0">Top Carriers</h3>
      {carriers.map((carrier, index) => (
        <li key={index} className="flex items-center text-xs">
          <b>{index+1}</b>. {carrier.name} - {carrier.trucks_per_day} trucks/day
        </li>
      ))}
    </ul>
  );
};

export default TopCarriers;
