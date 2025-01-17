"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Input } from "../features/form-controllers/input";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/login/action";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setLoading(true);
    const response = await loginAction(data.email, data.password);
    if (response.success) {
      toast({
        variant: "success",
        title: response.message,
        description: new Date().toLocaleTimeString(),
      });
      redirect("/dashboard");
    }
    toast({
      variant: "destructive",
      title: response.message,
      description: new Date().toLocaleTimeString(),
    });
    form.reset();
    setLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4">
                <Input
                  name={"email"}
                  label={"Email"}
                  control={form.control}
                  type="email"
                  placeholder="name@example.com"
                />
                <Input
                  name={"password"}
                  label={"Password"}
                  type="password"
                  control={form.control}
                />
                <Button
                  type="submit"
                  className="w-full"
                  {...(loading && { disabled: true })}
                >
                  {loading && (
                    <LoaderCircle size={24} className="animate-spin" />
                  )}
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
