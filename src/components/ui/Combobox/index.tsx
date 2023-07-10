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
          //   variant="outline"

          color="neutral"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? offices?.find((office) => office.id === value)?.name
            : 'Selecione um escritório'}
          {/* <Chevron className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>Nenhum escritório encontrado</CommandEmpty>
          <CommandGroup>
            {offices?.map((office) => (
              <CommandItem
                key={office.id}
                value={office.id}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? '' : currentValue)
                  setValue(currentValue === value ? '' : currentValue)
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
