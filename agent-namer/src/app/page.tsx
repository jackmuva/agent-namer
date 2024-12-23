import AgentForm from "@/components/ui/agent-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6 h-svh justify-center items-center font-['Helvetica'] text-white">
      <div className=" font-bold text-4xl ">
        Ready to name your AI agent?
      </div>
      <AgentForm></AgentForm>
    </div>
  );
}
