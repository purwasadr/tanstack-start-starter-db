import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from './-components/login-form'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="https://mersiflab.com"
            className="flex items-center gap-2 font-medium"
          >
            <img src="/logo-192.png" alt="Logo" className="size-18" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="border-l border-gray-200 bg-muted relative hidden lg:block">
        <img
          src="/img1.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
