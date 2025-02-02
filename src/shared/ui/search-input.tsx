'use client'

import { Input } from "@heroui/react"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface SearchInputProps {
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  debounceTime?: number
}

export const SearchInput = ({ 
  onSearch, 
  placeholder = "Поиск...", 
  className = "",
  debounceTime = 300 
}: SearchInputProps) => {
  const [value, setValue] = useState("")
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, debounceTime)

    return () => clearTimeout(timer)
  }, [value, debounceTime, onSearch])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      startContent={<Search size={18} className="text-neutral-500" />}
      className={className}
      variant="bordered"
      classNames={{
        input: [
          "text-neutral-900",
          "placeholder:text-neutral-500",
          "focus:placeholder:text-transparent"
        ].join(" ")
      }}
    />
  )
} 