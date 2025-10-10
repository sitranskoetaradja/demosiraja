import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    nip: string
    name: string
    position: string
    rank: string
    role: string
    email: string
    phone: string
    password: string
    avatar: string | null
}

export type PhotoFields = {
    avatar: string
}

export type UserFormSchema = GeneralFields & PhotoFields

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}
