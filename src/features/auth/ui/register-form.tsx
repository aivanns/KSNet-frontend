'use client'

import { useTranslation } from 'react-i18next'
import { useRegister } from '../model/use-auth'
import { DynamicFormFields, type FormField } from '@/shared/ui/dynamic-form'
import Link from 'next/link'
import { registerSchema, type RegisterFormData } from '../model/auth'
import { BackHeader } from '@/shared/ui/back-header'
import useGroupApi from '@/features/group/api/group'
import { Group } from '@/features/group/model/group'

export function RegisterForm() {
  const { t } = useTranslation()
  const { mutate: registerUser, isPending } = useRegister()
  const { data: groupsData } = useGroupApi.useGetGroups()

  const fields: FormField[] = [
    {
      name: 'firstName',
      type: 'text',
      label: t('auth.firstName'),
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: t('auth.lastName'),
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: t('auth.email'),
      required: true,
      autoComplete: 'email'
    },
    {
      name: 'password',
      type: 'password',
      label: t('auth.password'),
      required: true,
      autoComplete: 'new-password',
      endContent: true
    },
    {
      name: 'groupId',
      type: 'select',
      label: t('auth.group'),
      required: true,
      options: groupsData?.data.map((group: Group) => ({
        value: group.id,
        label: group.name
      })) || []
    }
  ]

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data)
  }

  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-neutral-200">
      <DynamicFormFields 
        fields={fields}
        schema={registerSchema}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
        submitButton={{
          text: t('auth.submit.register'),
          isLoading: isPending
        }}
      >
        <BackHeader title={t('back.to.home')} size="sm" className="mb-4" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">
            {t('auth.register')}
          </h1>
          <p className="mt-2 text-neutral-600">
            Создайте свой аккаунт
          </p>
        </div>
      </DynamicFormFields>

      <p className="text-center text-sm text-neutral-600 mt-6">
        {t('auth.haveAccount')}{' '}
        <Link 
          href="/login" 
          className="text-safetyOrange hover:underline font-medium"
        >
          {t('auth.signIn')}
        </Link>
      </p>
    </div>
  )
} 