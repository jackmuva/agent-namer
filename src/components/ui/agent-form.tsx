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
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./textarea";
import { useState } from "react";
import { ProgressBar } from "./progress-bar";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const formSchema = z.object({
  description: z.string(),
  gender: z.string(),
  website: z.string()
});

export default function AgentForm() {
  const [formState, setFormState] = useState<{ names: string, loading: boolean }>({ names: "", loading: false });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      gender: "",
      website: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFormState({ names: "", loading: true });
    const response = await fetch(window.location.href + "api/generate", {
      method: "POST",
      body: JSON.stringify({ description: values.description, gender: values.gender, website: values.website })
    });
    const body = await response.json();
    console.log(body);
    setFormState({ names: body.message, loading: false });
  }

  function startOver() {
    setFormState({ names: "", loading: false });
  }
  return (
    <div className="w-full bg-stone-900 p-4 rounded-xl shadow-2xl border-2 border-stone-600 ">
      {formState.names === "" && <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  Share your website to help our name generator get to know your AI agent better
                </FormDescription>
                <FormControl>
                  <Input type="text" placeholder="Company Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormDescription>
                    Preferred gender of your AI agent
                  </FormDescription>
                  <FormControl>
                    <SelectTrigger className="text-gray-500">
                      <SelectValue placeholder="unisex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="unisex">unisex</SelectItem>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                  </SelectContent>
                </Select>
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
