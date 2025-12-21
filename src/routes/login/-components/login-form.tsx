import { z } from 'zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'
import { useAppForm } from '@/hooks/use-app-form'

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password is required.',
  }),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const navigate = useNavigate()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    } as z.infer<typeof formSchema>,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          async () => {
            const res = await authClient.signIn.email({
              email: value.email,
              password: value.password,
              rememberMe: true,
            })
            if (res.error) {
              throw res.error
            }
          },
          {
            loading: 'Logging in...',
            success: () => {
              navigate({ to: '/', replace: true })
              return 'Logged in successfully'
            },
            error: (error) => {
              return error.message || 'Failed to login'
            },
          },
        )
        .unwrap()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <fieldset>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <form.AppField name="email">
            {(field) => <field.TextField label="Email" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => <field.TextField label="Password" type="password" />}
          </form.AppField>
          <form.AppForm>
            <form.SubscribeButton label="Login" className="w-full" />
          </form.AppForm>
        </div>
        <div className="text-center text-sm mt-6">
          Don&apos;t have an account?{' '}
          {/* <Link to="/register" className="underline underline-offset-4">
            Register
          </Link> */}
        </div>
      </fieldset>
    </form>
  )
}
