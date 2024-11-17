import RouteSearch from "../custom/map/RouteSearch";

export default function RootPage() {
  return (
    <div className="w-full mx-auto text-center">
      <h1 className="text-2xl font-bold my-8">Genlogs Portal</h1>
      <RouteSearch />
    </div>
  );
}
