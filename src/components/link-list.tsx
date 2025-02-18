'use client'

import { useLinkStore } from '@/lib/zustand-stores'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Label } from './ui/label'

const LinkList = () => {
  const links = useLinkStore((state) => state.links)
  const deleteLinks = useLinkStore((state) => state.deleteLink)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {links &&
          links.map((link) => (
            <div key={link.id} className="flex flex-col gap-2">
              <Label>{link.label}</Label>
              <div className="flex">
                <Input defaultValue={link.value} className="flex-1" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    deleteLinks(link.id)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default LinkList
