"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { btnStyle } from "@/components/ui";
import { ArrowRight } from "@phosphor-icons/react";

const initial = {
  opacity: 0,
  x: 100,
};

const animate = {
  opacity: 1,
  x: 0,
};

const exit = {
  opacity: 0,
  x: 0,
};

const errorInitial = {
  opacity: 0,
  y: 20,
};

const errorAnimate = {
  opacity: 1,
  y: 0,
};

const transition = { duration: 0.3 };

type StepProps = {
  value: string;
  onValueChange: (key: string, value: string) => void;
  setStep: (step: 1 | 2 | 3) => void;
  loading?: boolean;
};

function Step1(props: StepProps) {
  const [error, setError] = useState<string | null>(null);
  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={initial}
      animate={animate}
      transition={transition}
      exit={exit}
    >
      <label htmlFor="to" className="text-md font-medium flex gap-3">
        <span className="flex items-center gap-1 text-sm">
          1. <ArrowRight />
        </span>
        Email
      </label>
      <div className="flex flex-col gap-2">
        <input
          placeholder="eg. name@gmail.com"
          name="to"
          className="p-2 bg-black/5 rounded w-full focus:outline-none"
          required
          onChange={({ currentTarget }) => {
            props.onValueChange("to", currentTarget.value);
            setError(null);
          }}
          value={props.value}
        />
        {error && (
          <motion.p
            className="text-xs bg-red-600/20 text-red-600 p-1 rounded w-max"
            initial={errorInitial}
            animate={errorAnimate}
            transition={transition}
          >
            {error}
          </motion.p>
        )}
      </div>
      {!error && (
        <button
          onClick={() => {
            if (props.value.trim() === "") {
              setError("Plase fill the feild");
              return;
            }

            if (!isEmailValid(props.value)) {
              setError("Invalid Email");
              return;
            }

            props.setStep(2);
          }}
          className={[btnStyle, "w-max"].join(" ")}
        >
          Next
        </button>
      )}
    </motion.div>
  );
}

function Step2(props: StepProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={initial}
      animate={animate}
      transition={transition}
      exit={exit}
    >
      <label htmlFor="body" className="text-md font-medium flex gap-3">
        <span className="flex items-center gap-1 text-sm">
          2. <ArrowRight />
        </span>
        Body
      </label>
      <div className="flex flex-col gap-2">
        <textarea
          placeholder="eg. Hey, how are you...."
          name="body"
          className="px-2 py-1 bg-black/5 rounded h-48 w-full focus:outline-none"
          required
          onChange={({ currentTarget }) => {
            props.onValueChange("body", currentTarget.value);
            setError(null);
          }}
          value={props.value}
        />
        {error && (
          <motion.p
            className="text-xs bg-red-600/20 text-red-600 p-1 rounded w-max"
            initial={errorInitial}
            animate={errorAnimate}
            transition={transition}
          >
            {error}
          </motion.p>
        )}
      </div>
      {!error && (
        <button
          onClick={() => {
            if (props.value.trim() === "") {
              setError("Can't leave the feild empty");
              return;
            }
            props.setStep(3);
          }}
          className={[btnStyle, "w-max"].join(" ")}
        >
          Next
        </button>
      )}
    </motion.div>
  );
}

function Step3(props: StepProps) {
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();
  const oneYearLater = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  let newDate = new Date(props.value);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={initial}
      animate={animate}
      transition={transition}
      exit={exit}
    >
      <label htmlFor="date" className="text-md font-medium flex gap-3">
        <span className="flex items-center gap-1 text-sm">
          3. <ArrowRight />
        </span>
        Date
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="date"
          name="date"
          className="p-2 bg-black/5 rounded w-full focus:outline-none"
          required
          onChange={({ currentTarget }) => {
            props.onValueChange("date", currentTarget.value);
            setError(null);
          }}
          value={props.value}
        />
        {error && (
          <motion.p
            className="text-xs bg-red-600/20 text-red-600 p-1 rounded w-max"
            initial={errorInitial}
            animate={errorAnimate}
            transition={transition}
          >
            {error}
          </motion.p>
        )}
      </div>

      {!error && (
        <button
          type="submit"
          className={[btnStyle, "w-max"].join(" ")}
          disabled={props.loading}
          onClick={() => {
            if (!props.value) {
              setError("Please fill the feild");
              return;
            }

            if (newDate < oneYearLater) {
              setError("Date should be atleast one year in future from today");
              return;
            }
          }}
        >
          Submit
        </button>
      )}
    </motion.div>
  );
}

function Step4() {
  return (
    <motion.div
      className="max-w-[420px] mx-auto flex flex-col justify-center items-center shadow-inner"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        transition: { duration: 2 },
      }}
    >
      <div className="p-10 rounded-md bg-gradient-to-r bg-white shadow-sm border border-slate-200 flex flex-col items-center gap-4">
        <img src="logo.svg" alt="logo" className="h-10 w-10" />
        <h1 className="text-2xl font-medium text-center ">
          Your email has been stored
        </h1>
        <p className="text-lg text-center">
          Sit back and relax, your email is on its way to the future!
        </p>
      </div>
    </motion.div>
  );
}

const Form = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState({
    to: "",
    body: "",
    date: "",
  });

  const handleValueChange = (key: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { to, body, date } = data;
    setLoading(true);

    try {
      await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Letter to self",
          to,
          date,
          body,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    setCurrentStep(4);
  };

  const steps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
  };

  const StepComponent = steps[currentStep];

  return (
    <main>
      <div className="w-[min(640px,_100%)] mx-auto p-6">
        <form
          className="flex flex-col justify-center gap-8 min-h-[70vh]"
          method="post"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <StepComponent
            value={
              data[
                `${
                  currentStep === 3 ? "date" : currentStep === 2 ? "body" : "to"
                }`
              ]
            }
            onValueChange={handleValueChange}
            setStep={setCurrentStep}
            loading={loading}
          />
        </form>
      </div>
    </main>
  );
};

export default Form;
