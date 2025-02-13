'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

import Link from 'next/link'
import { useStore } from '@/lib/userStore'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useStore((state) => state.user)
  const signOut = useStore((state) => state.signOut)
  const router = useRouter()

  const navigation = [{ name: 'Home', href: '/' }]
  const userNavigation = [{ name: 'New', href: '/new' }]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-gray-800">
              Logo
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link href={item.href} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                  {item.name}
                </Link>
              </div>
            ))}

            <div>
              {userNavigation &&
                userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
            {user ? (
              <Button
                onClick={() => {
                  signOut()
                  router.push('/')
                }}
              >
                Sign out
              </Button>
            ) : (
              <Link href={'/login'}>
                <Button>Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
