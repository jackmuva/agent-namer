"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./textarea";
import { useState } from "react";
import { ProgressBar } from "./progress-bar";

const formSchema = z.object({
  description: z.string(),
  keywords: z.string()
});

export default function AgentForm() {
  const [formState, setFormState] = useState<{ names: string, loading: boolean }>({ names: "", loading: false });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      keywords: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormState({ names: "", loading: true });
    const response = await fetch(window.location.href + "api/generate", {
      method: "POST",
      body: JSON.stringify({ description: values.description, keywords: values.keywords })
    });
    const body = await response.json();
    console.log(body);
    setFormState({ names: body.message, loading: false });
  }

  function startOver() {
    setFormState({ names: "", loading: false });
  }
  return (
    <div className="w-1/3 bg-stone-900 p-4 rounded-xl shadow-2xl border-2 border-stone-600">
      {formState.names === "" && <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  Give us a description of your agent and its functionality
                </FormDescription>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  Any must-have keywords for your agent's name
                </FormDescription>
                <FormControl>
                  <Textarea placeholder="Keywords" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-stone-700 shadow-2xl hover:-translate-y-0.5 hover:bg-stone-800 font-bold" type="submit">Generate</Button>
          {formState.loading && <ProgressBar />}
        </form>
      </Form>
      }
      {formState.names !== "" && <div className="px-8 py-4 whitespace-pre-line text-xl flex flex-col space-y-4">
        <div className="font-bold">
          Here are some ideas for your agent name!
        </div>
        <div>
          {formState.names}
        </div>
        <Button className="bg-stone-700 shadow-2xl hover:-translate-y-0.5 hover:bg-stone-800 font-bold" type="submit" onClick={startOver}>Start Over</Button>
      </div>
      }
    </div>
  );
};
