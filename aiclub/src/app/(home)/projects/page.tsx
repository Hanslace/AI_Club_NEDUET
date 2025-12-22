import {  Breadcrumb} from "@/../components";

export default function Projects() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <Breadcrumb
        items={[
            { label: "Home", href: "/" },
            { label: "Projects" },
        ]}
        />

    </div>
  );
}
