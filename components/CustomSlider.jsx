"use client";

import { Slider } from "@nextui-org/slider";

const CustomSlider = ({ selectedRange, setSelectedRange }) => {
  return (
    <div className="flex justify-center w-full px-4 py-2 bg-white rounded-lg ">
      <Slider
        label="Price Range"
        color="primary"
        step={1000}
        minValue={0}
        maxValue={300000}
        defaultValue={selectedRange}
        formatOptions={{ style: "currency", currency: "JPY" }}
        className="w-full"
        onChange={(e) => {
          setSelectedRange(e); // Update the selected range in state
        }}
      />
    </div>
  );
};
export default CustomSlider;
