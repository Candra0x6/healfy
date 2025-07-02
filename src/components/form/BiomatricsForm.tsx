"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  BiometricsPayload,
  biometricsSchema,
} from "@/src/libs/validators/biometricsSchema";
import { useForm } from "react-hook-form";
import { useUserMedicalStore } from "@/src/store/user-medical-store";
import { motion } from "framer-motion";
import { Slider } from "../ui/slider";
import { Heart, Ruler, Weight } from "lucide-react";

type BiometricsFormProps = {
  handleContinue?: () => void;
};

export const BiomatricsForm: React.FC<BiometricsFormProps> = (props) => {
  const { updateUserBiometrics, biometrics } = useUserMedicalStore();
  const form = useForm<z.infer<typeof biometricsSchema>>({
    resolver: zodResolver(biometricsSchema),
    defaultValues: {
      age: String(biometrics?.age) || "",
      avargeDailyBP: String(biometrics?.avargeDailyBP) || "",
      gender: biometrics?.gender || "MALE",
      heartRate: String(biometrics?.heartRate) || "",
      height: String(biometrics?.height) || "",
      hipCircumference: String(biometrics?.hipCircumference) || "",
      restingHeartRate: String(biometrics?.restingHeartRate) || "",
      waistCircumference: String(biometrics?.waistCircumference) || "",
      weight: String(biometrics?.weight) || "",
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
      name: "avargeDailyBP",
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

  const onSubmit = async (data: BiometricsPayload) => {
    try {
      const transformedData = {
        ...data,
        avargeDailyBP: parseFloat(data.avargeDailyBP),
        hipCircumference: parseFloat(data.hipCircumference),
        restingHeartRate: parseFloat(data.restingHeartRate),
        waistCircumference: parseFloat(data.waistCircumference),
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        heartRate: parseFloat(data.heartRate),
        age: parseInt(data.age, 10),
      };
      updateUserBiometrics(transformedData);
      props.handleContinue?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gap-x-4 grid grid-cols-1 sm:grid-cols-2 w-full">
          <motion.div
            className="bg-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
            whileHover={{ rotate: -2 }}
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {Resistence.map((value, i) => (
            <FormField
              key={i}
              control={form.control}
              name={value.name as keyof BiometricsPayload}
              render={({ field }) => (
                <motion.div
                  className="bg-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
                  whileHover={{ rotate: Number(field?.value) >= 100 ? 2 : -2 }}
                >
                  <FormItem>
                    <FormLabel className="text-lg font-semibold flex items-center">
                      <Heart className="mr-2 text-red-500" /> {value.title}
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={40}
                        max={200}
                        step={1}
                        value={[Number(field.value) || 0]}
                        onValueChange={(value) =>
                          field.onChange(String(value[0]))
                        }
                      />
                    </FormControl>
                    <FormDescription className="text-center text-2xl font-bold text-foreground">
                      {field.value == "undefined" ? 0 : field.value}{" "}
                      {value.unit}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
          ))}
        </div>
        <motion.div
          className="bg-card rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Body Metrics</h2>
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
                      onChange={(e) => field.onChange(String(e.target.value))}
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
                      onChange={(e) => field.onChange(String(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>
        <Button type="submit" className="w-full mt-5">
          Submit
        </Button>
      </form>
    </Form>
  );
};
