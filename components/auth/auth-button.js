'use client'

import { useAuth } from '../../hooks/use-auth'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function AuthButton() {
  const { openAuthModal, isAuthenticated, customer, logout } = useAuth()

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="User menu"
          >
            <i className="ri-user-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <div className="truncate text-sm">
              {customer?.firstName} {customer?.lastName}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {customer?.email}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <i className="ri-logout-box-line mr-2"></i>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={openAuthModal}
      aria-label="Login"
      title="Login / Sign up"
    >
      <i className="ri-user-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
    </Button>
  )
}