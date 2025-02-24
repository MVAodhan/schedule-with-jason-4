import { Episode } from '@/types'
import React from 'react'

const Title = ({ episode }: { episode: Episode }) => {
  return <h2 className="text-2xl font-bold">{episode.title}</h2>
}

export default Title
