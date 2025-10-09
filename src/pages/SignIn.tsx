import { UserAuthForm } from '@/components/login/UserAuthForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../assets/Prepme.svg'

export default function SignIn() {
  const { t } = useTranslation()
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-primary' />
          <div className='relative z-20 flex items-center text-lg font-medium'>

          </div>
          <div className='flex justify-center items-center h-full'>
            <img src={logo} alt='logo' className='h-20 w-full filter brightness-0 invert' />

          </div>


          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;
                {t('hero_description')}
                &rdquo;
              </p>
              <footer className='text-sm'><a href='https://www.adev.ma' target='_blank'>Adev.ma</a></footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>{t('login.title')}</h1>
              < p className='text-sm text-muted-foreground' dangerouslySetInnerHTML={{ __html: t('login.description') }} >
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              {t('login.condition')}
            </p>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              {t('register.message')}
              <Link to='/register' className='text-primary'>
                {t('register.create')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}