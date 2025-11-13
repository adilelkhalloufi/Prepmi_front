import { UserAuthForm } from '@/components/login/UserAuthForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../assets/Prepme.svg'
import { Button } from '@/components/ui/button'

export default function SignIn() {
  const { t } = useTranslation()
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        {/* First Section */}
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-hidden'>
          <div className='absolute inset-0 bg-primary' />
          
          {/* Watermark Background - Overflowing */}
          <div className='absolute inset-0 opacity-20 pointer-events-none' style={{
            overflow: 'visible',
          }}>
            <div style={{
              transform: 'rotate(-45deg) translate(-20%, -20%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              columnGap: '0rem',
              width: '250%',
              height: '250%',
              position: 'absolute',
              top: '-75%',
              left: '-75%',
              fontSize: '8rem',
              lineHeight: '1',
            }}>
              <span>🍽️</span>
              <span>🍲</span>
              <span>🍱</span>
              <span>🥘</span>
              <span>🍛</span>
              <span>🍜</span>
              <span>🍝</span>
              <span>🍳</span>
              <span>🥗</span>
              <span>🍽️</span>
              <span>🍲</span>
              <span>🍱</span>
              <span>🥘</span>
              <span>🍛</span>
              <span>🍜</span>
              <span>🍝</span>
              <span>🍳</span>
              <span>🥗</span>
              <span>🍽️</span>
              <span>🍲</span>
              <span>🍱</span>
              <span>🥘</span>
              <span>🍛</span>
              <span>🍜</span>
              <span>🍝</span>
            </div>
          </div>

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
                    <img src={logo} />

              <h1 className='text-2xl font-semibold tracking-tight'>{t('login.title')}</h1>
              < p className='text-sm text-muted-foreground' dangerouslySetInnerHTML={{ __html: t('login.description') }} >
              </p>
            </div>
            <UserAuthForm />
            {/* <Button asChild className="w-full bg-primary hover:bg-primary/80">
              <Link to="/register">{t('register.create')}</Link>
            </Button> */}
            <p className='px-8 text-center text-sm text-muted-foreground'>
              {t('login.condition')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}