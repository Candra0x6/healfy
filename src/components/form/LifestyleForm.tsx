"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LifestylePayload,
  lifestyleSchema,
} from "@/src/libs/validators/lifestyleSchema";
import { Button } from "../ui/button";
import { useUserMedicalStore } from "@/src/store/user-medical-store";

type LifestyleFormProps = {
  handleContinue?: () => void;
};
type sectionType = {
  name: string;
  label: string;
  type: string;
  options: { id: string; value: string }[];
};
const section: sectionType[] = [
  {
    name: "smokingHabit",
    label: "Smoking Habit",
    type: "select",
    options: [
      { id: "Non Smoker", value: "NON_SMOKER" },
      { id: "Former Smoker", value: "FORMER_SMOKER" },
      { id: "Active Smoker", value: "ACTIVE_SMOKER" },
    ],
  },
  {
    name: "alcoholConsumption",
    label: "Alcohol Consumption",
    type: "select",
    options: [
      { id: "Never", value: "NEVER" },
      { id: "Occasional", value: "OCCASIONAL" },
      { id: "Frequent", value: "FREQUENT" },
    ],
  },
  {
    name: "dietaryPattern",
    label: "Dietary Pattern",
    type: "select",
    options: [
      { id: "Balanced", value: "BALANCED" },
      { id: "Vegetarian", value: "VEGETARIAN" },
      { id: "Vegan", value: "VEGAN" },
      { id: "High Protein", value: "HIGH_PROTEIN" },
      { id: "High Carb", value: "HIGH_CARB" },
      { id: "Low Fat", value: "LOW_FAT" },
      { id: "Keto", value: "KETO" },
      { id: "Gluten Free", value: "GLUTEN_FREE" },
      { id: "No Special Diet", value: "NO_SPECIAL_DIET" },
    ],
  },
  {
    name: "physicalActivity",
    label: "Physical Activity",
    type: "select",
    options: [
      { id: "Very Rare", value: "VERY_RARE" },
      { id: "Rare", value: "RARE" },
      { id: "Moderate", value: "MODERATE" },
      { id: "Regular", value: "REGULAR" },
    ],
  },
];

export const LifestyleForm: React.FC<LifestyleFormProps> = (props) => {
  const { updateUserLifestyle, lifestyle } = useUserMedicalStore();
  const form = useForm<z.infer<typeof lifestyleSchema>>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      smokingHabit: lifestyle?.smokingHabit || "NON_SMOKER",
      alcoholConsumption: lifestyle?.alcoholConsumption || "NEVER",
      dietaryPattern: lifestyle?.dietaryPattern || "BALANCED",
      physicalActivity: lifestyle?.physicalActivity || "VERY_RARE",
    },
  });

  const onSubmit = async (data: LifestylePayload) => {
    updateUserLifestyle(data);
    props.handleContinue?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          {section.map((value, i) => (
            <FormField
              key={i}
              control={form.control}
              name={
                value.name as
                  | "smokingHabit"
                  | "alcoholConsumption"
                  | "dietaryPattern"
                  | "physicalActivity"
              }
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{value.label}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={value.label}
                          className="w-full"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{value.label}</SelectLabel>
                        {value.options.map((item, i) => (
                          <SelectItem key={i} value={item.value}>
                            {item.id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" className="mt-5 w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};
