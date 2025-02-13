'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useStore } from '@/lib/userStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useStore((state) => state.user)

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Log In', href: '/login' },
  ]
  const userNavigation = [{ name: 'New', href: '#' }]

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
                {/* {item.dropdownItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a href={item.href} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    {item.name}
                  </a>
                )} */}
                <a href={item.href} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                  {item.name}
                </a>
              </div>
            ))}

            {user && <div>{user.name}</div>}
            <div>
              {userNavigation &&
                userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
            </div>
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
              {/* {item.dropdownItems ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="pl-4">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  {item.name}
                </a>
              )} */}
              <a
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
