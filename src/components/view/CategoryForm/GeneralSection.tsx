'use client'

import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type GeneralSectionProps = FormSectionBaseProps



const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
                <FormItem
                    label="Nama Kategori"
                    invalid={Boolean(errors.categoryName)}
                    errorMessage={errors.categoryName?.message}
                >
                    <Controller
                        name="categoryName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex: Sarana Pendukung"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            
        </Card>
    )
}

export default GeneralSection
