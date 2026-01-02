import { Breadcrumb} from "@/components";

export default function Blogs() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
        <Breadcrumb
        items={[
            { label: "Home", href: "/" },
            { label: "Blogs" },
        ]}
        />

    </div>
  );
}
