import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    code: string
    name: string
    from: string
    to: string
}


export type TrackFormSchema = GeneralFields 

export type FormSectionBaseProps = {
    control: Control<TrackFormSchema>
    errors: FieldErrors<TrackFormSchema>
}
