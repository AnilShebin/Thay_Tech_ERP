"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"; // Import shadcn button
import TextInput from "@/components/shared/TextInput";
import { authFormSchema } from "@/lib/utils";

const AuthFormClient = () => {
  // Define the schema for sign-in
  const formSchema = authFormSchema();

  // Define the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staff_id: "",
      password: "",
    },
  });

  // Submit handler for form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    // Add sign-in logic here
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Staff ID Input */}
      <TextInput
        label="Staff ID"
        placeholder="Enter your staff ID"
        name="staff_id"
        value={form.watch("staff_id")}
        onChange={(e) => form.setValue("staff_id", e.target.value)}
        error={form.formState.errors.staff_id?.message}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        placeholder="Enter your password"
        name="password"
        type="password"
        value={form.watch("password")}
        onChange={(e) => form.setValue("password", e.target.value)}
        error={form.formState.errors.password?.message}
      />

      {/* Submit Button */}
      <Button type="submit" className="form-btn">
        Sign In
      </Button>
    </form>
  );
};

export default AuthFormClient;
