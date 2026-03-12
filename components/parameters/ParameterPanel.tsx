"use client"

import { TemperatureSlider } from "./TemperatureSlider"
import { MaxTokensSlider } from "./MaxTokensSlider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ParameterPanelProps {
  parameters: {
    temperature: number
    maxTokens: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
  }
  onChange: (parameters: any) => void
}

export function ParameterPanel({ parameters, onChange }: ParameterPanelProps) {
  const updateParameter = (key: string, value: any) => {
    onChange({ ...parameters, [key]: value })
  }

  return (
    <div className="p-4 bg-muted/30 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Temperature</Label>
            <span className="text-sm text-muted-foreground">
              {parameters.temperature}
            </span>
          </div>
          <TemperatureSlider
            value={parameters.temperature}
            onChange={(v) => updateParameter("temperature", v)}
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness: Lower is more focused, higher is more creative
          </p>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Max Tokens</Label>
            <span className="text-sm text-muted-foreground">
              {parameters.maxTokens}
            </span>
          </div>
          <MaxTokensSlider
            value={parameters.maxTokens}
            onChange={(v) => updateParameter("maxTokens", v)}
          />
          <p className="text-xs text-muted-foreground">
            Maximum length of the response
          </p>
        </div>

        {/* Top P */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Top P</Label>
            <span className="text-sm text-muted-foreground">
              {parameters.topP}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={parameters.topP}
            onChange={(e) => updateParameter("topP", parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Nucleus sampling: Controls diversity
          </p>
        </div>

        {/* Frequency Penalty */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Frequency Penalty</Label>
            <span className="text-sm text-muted-foreground">
              {parameters.frequencyPenalty}
            </span>
          </div>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.1}
            value={parameters.frequencyPenalty}
            onChange={(e) => updateParameter("frequencyPenalty", parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Reduces repetition of tokens
          </p>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <Label>Streaming</Label>
            <p className="text-xs text-muted-foreground">
              See response in real-time
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}