"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

interface TemperatureSliderProps {
  value: number
  onChange: (value: number) => void
}

export function TemperatureSlider({ value, onChange }: TemperatureSliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      max={2}
      min={0}
      step={0.1}
    >
      <SliderPrimitive.Track className="bg-secondary relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Temperature"
      />
    </SliderPrimitive.Root>
  )
}