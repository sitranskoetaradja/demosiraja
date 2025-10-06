import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    categoryName: string
}

export type CategoryFormSchema = OverviewFields 

export type FormSectionBaseProps = {
    control: Control<CategoryFormSchema>
    errors: FieldErrors<CategoryFormSchema>
}
