'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { useQuery } from '@tanstack/react-query'
import { getOffices } from '@/queries/getOffices'
import { Check } from 'lucide-react'

type Props = {
  onValueChange: (value: string) => void
}

export function Combobox({ onValueChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { data: offices } = useQuery({
    queryKey: ['offices'],
    queryFn: getOffices,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          color="neutral"
          className="flex w-full items-center justify-start border  dark:border-neutral-700/50 border-neutral-300 bg-neutral-200 dark:bg-neutral-800/50 capitalize text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-500 focus:ring-emerald-500"
          role="combobox"
          aria-expanded={open}
        >
          {offices?.find((office) => office.id === value)?.name || (
            <span className="text-neutral-500">Selecione um escritório</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-[--radix-popover-trigger-width] p-0">
        <Command className="w-full">
          <CommandInput
            className="my-1.5 w-full border-none focus:ring-emerald-500"
            placeholder="Procure pelo nome..."
          />
          <CommandEmpty>Nenhuma empresa encontrado</CommandEmpty>
          <CommandGroup>
            {offices?.map((office) => (
              <CommandItem
                key={office.id}
                value={`${office.id} ${office.name}`}
                onSelect={(currentValue) => {
                  console.log(currentValue, offices)
                  const [id] = currentValue.split(' ')
                  onValueChange(id)
                  setValue(id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === office.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {office.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
