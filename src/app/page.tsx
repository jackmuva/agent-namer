import AgentForm from "@/components/ui/agent-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6 h-svh justify-center items-center font-['Helvetica'] text-white">
      <div className="text-3xl font-semibold">
        You&apos;ve built your AI agent...
      </div>
      <div className=" font-bold text-4xl ">
        More imporantly, what will you name it?
      </div>
      <AgentForm></AgentForm>
      <a
        href="https://www.useparagon.com/"
        target="_blank"
        className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
      >
        <Image
          className="rounded-xl"
          src="/paragon-logo.png"
          alt="Paragon Logo"
          width={30}
          height={30}
          priority
        />
        <span>Paragon - Equip your agent with integrations</span>
      </a>
    </div>
  );
}
