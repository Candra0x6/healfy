"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { useState } from "react";
import { useUserMedicalStore } from "@/src/store/user-medical-store";

// const createCharacter = async (data: {
//   name: string;
//   symbol: string;
//   currentXP: number;
//   level: number;
// }) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/character/new`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: data.name,
//           symbol: data.symbol,
//           currentXP: data.currentXP,
//           level: data.symbol,
//         }),
//       }
//     );
//     const character = await response.json();
//     console.log(character);
//   } catch (error) {
//     console.error("Fetch error: ", error);
//   }
// };

type MedicalHistoryFormProps = {
  onContinue?: () => void;
  title?: string;
};
export const createMission = async (): Promise<Response | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mission/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
    return undefined;
  }
};

const items = [
  { id: "Obesity", label: "Obesity" },
  { id: "Asthma", label: "Asthma" },
  { id: "Gastritis", label: "Gastritis" },
  { id: "Migraine", label: "Migraine" },
  { id: "Hypertension", label: "Hypertension" },
  { id: "Cholesterol", label: "Cholesterol" },
  { id: "Anemia", label: "Anemia" },
  { id: "Vertigo", label: "Vertigo" },
  { id: "Gout", label: "Gout" },
  { id: "Diabetes", label: "Diabetes" },
  { id: "Diarrhea", label: "Diarrhea" },
  { id: "Diabetes_Mellitus", label: "Diabetes Mellitus" },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one item",
  }),
});

export const MedicalHistoryFormCheckbox: React.FC<MedicalHistoryFormProps> = (
  props
) => {
  const { updateMedicalHistory, medicalHistory } = useUserMedicalStore();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: medicalHistory || [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateMedicalHistory(data.items);
    props.onContinue?.();
    // fetchMedicalHistory();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="w-full">
              <AnimatePresence>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FormItem className="flex py-2 px-4 rounded-lg border border-card">
                        <div className="flex items-center space-x-2 w-full">
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const updatedItems = checked
                                  ? [...field.value, item.id]
                                  : field.value.filter(
                                      (value) => value !== item.id
                                    );
                                form.setValue("items", updatedItems);
                                setCheckedItems((prev) => ({
                                  ...prev,
                                  [item.id]: !!checked,
                                }));
                              }}
                              className="peer h-6 w-6 shrink-0 rounded-sm border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 bg-primary/20 data-[state=checked]:bg-primary"
                            >
                              <motion.div
                                className="h-5 w-5 rounded-sm bg-white shadow-sm"
                                initial={false}
                                animate={{
                                  x: checkedItems[item.id] ? 16 : 0,
                                  scale: checkedItems[item.id] ? 0.8 : 1,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              />
                            </Checkbox>
                          </FormControl>
                          <Label
                            htmlFor={`ios-checkbox-${item.label}`}
                            className="flex-grow"
                          >
                            {item.label}
                          </Label>
                        </div>
                      </FormItem>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {props?.title || "Submit"}
        </Button>
      </form>
    </Form>
  );
};
