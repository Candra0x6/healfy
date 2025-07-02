"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { LifestyleModification } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
interface IHabitCardProps {
  data: LifestyleModification;
  setState: React.Dispatch<React.SetStateAction<number>>;
  stateId: number;
  handleConfetti: (event: React.MouseEvent) => void;
}

const HabitShowcaseCard: React.FunctionComponent<IHabitCardProps> = (props) => {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateX: -100, filter: "blur(10px)" }}
        animate={{ opacity: 1, translateX: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0 }}
      >
        <Card
          className={`flex w-[400px] h-full p-7 items-center justify-between transition-all duration-300 ease-in-out  ${
            isClicked ? " opacity-0 blur-md" : "scale-100"
          }`}
        >
          <CardHeader className="p-0 text-xl">{props.data.activity}</CardHeader>
          <CardContent className="p-0">
            <Checkbox
              onClick={props.handleConfetti}
              onCheckedChange={() => {
                setTimeout(() => {
                  setIsClicked(true);
                }, 200);
                setTimeout(() => {
                  setIsClicked(false);

                  props.setState(props.stateId + 1);
                }, 300);
              }}
              className="w-7 h-7"
            />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default HabitShowcaseCard;
