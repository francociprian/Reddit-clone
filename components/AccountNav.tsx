'use client'

import Link from 'next/link';
import { useState } from 'react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/UserAvatar';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';



interface AccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export function AccountNav({ user }: AccountNavProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signUserOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8 dark:border-slate-500 dark:border-solid dark:border'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/'>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/r/create'>Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem >
          <Link href='/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <Button className='pl-0' variant='ghost' size='sm' onClick={signUserOut} isLoading={isLoading}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}