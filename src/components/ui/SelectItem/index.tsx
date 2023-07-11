import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { TOfficeWithClient } from '@/types'

type Props = {
  onValueChange: (value: string) => void
  value: string
  options: TOfficeWithClient[] | undefined
}

export const SelectContainer = ({ onValueChange, value, options }: Props) => (
  <Select.Root onValueChange={onValueChange} value={value}>
    <Select.Trigger className="inline-flex h-[35px] w-80 items-center justify-center gap-[5px] rounded dark:bg-white px-[15px] text-[13px] leading-none dark:text-emerald-500 shadow-[0_2px_10px] dark:shadow-black/10 outline-none dark:hover:bg-neutral-700 focus:shadow-[0_0_0_2px] dark:focus:shadow-black dark:data-[placeholder]:text-emerald-500">
      <Select.Value
        placeholder="Selecione um Escritório"
        className="placeholder:text-black"
      />
      <Select.Icon className="dark:text-emerald-500">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="z-50 overflow-hidden  rounded-md dark:bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center dark:bg-white dark:text-emerald-500">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-black">
              Selecione um Escritório
            </Select.Label>

            {options?.map((data, index) => (
              <Select.Item
                key={index}
                value={data.id}
                className="cursor-pointer p-3 duration-100 ease-out dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:outline-emerald-500"
              >
                <Select.ItemText>{data.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center dark:bg-white dark:text-emerald-500">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

export default SelectContainer
