import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

type Props = {
  onValueChange: (value: string) => void
  value: string
}

export const SelectContainer = ({ onValueChange, value }: Props) => (
  <Select.Root onValueChange={onValueChange} value={value}>
    <Select.Trigger
      className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-emerald-500 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-neutral-700 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-emerald-500"
      aria-label="Food"
    >
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="text-emerald-500">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="z-50 overflow-hidden  rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-emerald-500">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-white">
              Fruits
            </Select.Label>
            <Select.Item
              value="adasdasdasd"
              className="cursor-pointer p-3 duration-100 ease-out focus:bg-neutral-800 focus:text-white focus:outline-emerald-500"
            >
              <Select.ItemText>Telecomunicações</Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-emerald-500">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

export default SelectContainer
