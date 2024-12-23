import AgentForm from "@/components/ui/agent-form";

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
    </div>
  );
}
