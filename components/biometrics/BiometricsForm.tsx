"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Ruler,
  Weight,
  Wine,
  Salad,
  Activity,
  Cigarette,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

const formSchema = z.object({
  age: z.number().min(0).max(120),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  height: z.number().min(0).max(300),
  weight: z.number().min(0).max(500),
  heartRate: z.number().min(0).max(220),
  avargeDailyBP: z.number().min(0).max(300),
  hipCircumference: z.number().min(0).max(300),
  restingHeartRate: z.number().min(0).max(300),
  waistCircumference: z.number().min(0).max(300),
  alcoholConsumption: z.enum(["NEVER", "RARELY", "OCCASIONALLY", "REGULARLY"]),
  dietaryPattern: z.enum(["BALANCED", "VEGETARIAN", "VEGAN", "KETO", "OTHER"]),
  physicalActivity: z.enum([
    "VERY_RARE",
    "OCCASIONAL",
    "REGULAR",
    "VERY_ACTIVE",
  ]),
  smokingHabit: z.enum([
    "NON_SMOKER",
    "FORMER_SMOKER",
    "OCCASIONAL_SMOKER",
    "REGULAR_SMOKER",
  ]),
});

export default function BuiometricsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "MALE",
      height: 170,
      weight: 70,
      heartRate: 70,
      avargeDailyBP: 70,
      hipCircumference: 18,
      restingHeartRate: 20,
      waistCircumference: 129,
      alcoholConsumption: "RARELY",
      dietaryPattern: "BALANCED",
      physicalActivity: "OCCASIONAL",
      smokingHabit: "NON_SMOKER",
    },
  });

  const Resistence = [
    {
      title: "Heart Rate",
      name: "heartRate",
      value: 70,
      unit: "bpm",
    },
    {
      title: "Average Daily BP",
      name: "averageDailyBP",
      value: 70,
      unit: "Hg",
    },
    {
      title: "Hip Circumference",
      name: "hipCircumference",
      value: 18,
      unit: "cm",
    },
    {
      title: "Resting Heart Rate",
      name: "restingHeartRate",
      value: 20,
      unit: "bpm",
    },
    {
      title: "Waist Circumference",
      name: "waistCircumference",
      value: 129,
      unit: "cm",
    },
  ];
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fun Health Form
          </motion.h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
                whileHover={{ rotate: -2 }}
              >
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                          className="text-2xl font-bold text-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className="bg-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
                whileHover={{ rotate: 2 }}
              >
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Resistence.map((value, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
                  whileHover={{ rotate: -2 }}
                >
                  <FormField
                    control={form.control}
                    name={
                      value.name as
                        | "age"
                        | "gender"
                        | "height"
                        | "weight"
                        | "heartRate"
                        | "avargeDailyBP"
                        | "hipCircumference"
                        | "restingHeartRate"
                        | "waistCircumference"
                        | "alcoholConsumption"
                        | "dietaryPattern"
                        | "physicalActivity"
                        | "smokingHabit"
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold flex items-center">
                          <Heart className="mr-2 text-red-500" /> {value.title}
                        </FormLabel>
                        <FormControl>
                          <Slider
                            min={40}
                            max={200}
                            step={1}
                            value={[field.value as number]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription className="text-center text-2xl font-bold text-foreground">
                          {value.value} {value.unit}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="bg-card rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Body Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Ruler className="mr-2 text-blue-500" /> Height (cm)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Weight className="mr-2 text-green-500" /> Weight (kg)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div
              className="bg-card rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Lifestyle Choices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="alcoholConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Wine className="mr-2 text-purple-500" /> Alcohol
                        Consumption
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select alcohol consumption" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NEVER">Never</SelectItem>
                          <SelectItem value="RARELY">Rarely</SelectItem>
                          <SelectItem value="OCCASIONALLY">
                            Occasionally
                          </SelectItem>
                          <SelectItem value="REGULARLY">Regularly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dietaryPattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Salad className="mr-2 text-green-500" /> Dietary
                        Pattern
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dietary pattern" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BALANCED">Balanced</SelectItem>
                          <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
                          <SelectItem value="VEGAN">Vegan</SelectItem>
                          <SelectItem value="KETO">Keto</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicalActivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Activity className="mr-2 text-blue-500" /> Physical
                        Activity
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select physical activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="VERY_RARE">Very Rare</SelectItem>
                          <SelectItem value="OCCASIONAL">Occasional</SelectItem>
                          <SelectItem value="REGULAR">Regular</SelectItem>
                          <SelectItem value="VERY_ACTIVE">
                            Very Active
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smokingHabit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold flex items-center">
                        <Cigarette className="mr-2 text-red-500" /> Smoking
                        Habit
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select smoking habit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NON_SMOKER">Non-smoker</SelectItem>
                          <SelectItem value="FORMER_SMOKER">
                            Former Smoker
                          </SelectItem>
                          <SelectItem value="OCCASIONAL_SMOKER">
                            Occasional Smoker
                          </SelectItem>
                          <SelectItem value="REGULAR_SMOKER">
                            Regular Smoker
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="w-full text-lg py-6">
                Submit Your Fun Health Form!
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
