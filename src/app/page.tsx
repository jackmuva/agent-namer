import AgentForm from "@/components/ui/agent-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 h-svh justify-center items-center font-['Helvetica'] text-white">
      <div className="text-2xl md:text-3xl font-semibold">
        You&apos;ve built your AI agent...
      </div>
      <div className=" font-bold text-2xl md:text-4xl ">
        More imporantly, what will you name it?
      </div>
      <div className="flex flex-col space-y-1 md:w-[500px] items-center">
        <div className="text-2xl ">
          AI Agent Name Generator
        </div>
        <AgentForm></AgentForm>
      </div>
      <a
        href="https://www.useparagon.com/"
        target="_blank"
      >
        <div className="flex items-center justify-center font-nunito text-lg font-bold gap-2">
          <span>By the team at </span>
          <Image
            className="rounded-xl"
            src="/paragon-logo.png"
            alt="Paragon Logo"
            width={30}
            height={30}
            priority
          />
          <span>Paragon</span>
        </div>
        <div className="text-2xl font-bold">
          Equip your AI agent with integrations
        </div>
      </a>
    </div>
  );
}
