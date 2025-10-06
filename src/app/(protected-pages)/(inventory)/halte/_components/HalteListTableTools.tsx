'use client'

import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { ChangeEvent } from 'react'
import Button from '@/components/ui/Button'
import { TbFilter } from 'react-icons/tb'

const HalteListTableTools = () => {
    const { onAppendQueryParams } = useAppendQueryParams()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onAppendQueryParams({
            query: event.target.value,
        })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <DebouceInput
                placeholder="Search"
                suffix={<TbSearch className="text-lg" />}
                onChange={handleInputChange}
            />
            <Button icon={<TbFilter />} onClick={() => {}}>
                Filter
            </Button>
        </div>
    )
}

export default HalteListTableTools
