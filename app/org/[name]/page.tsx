import Org from "@/app/components/org";

export default function OrgPage({ params }: { params: { name: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {params.name.charAt(0).toUpperCase() + params.name.slice(1)}
      </h1>
      <Org name={params.name} />
    </div>
  );
}
