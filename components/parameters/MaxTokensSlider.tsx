"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

interface MaxTokensSliderProps {
  value: number
  onChange: (value: number) => void
}

export function MaxTokensSlider({ value, onChange }: MaxTokensSliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      max={8000}
      min={100}
      step={100}
    >
      <SliderPrimitive.Track className="bg-secondary relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Max Tokens"
      />
    </SliderPrimitive.Root>
  )
}