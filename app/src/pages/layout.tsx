import { Sidebar } from "@/components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <div className="w-60 h-full">
        <Sidebar />
      </div>
      <div className="bg-zinc-900 w-full h-full">{children}</div>
    </div>
  );
};

export default RootLayout;
