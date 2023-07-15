import { MindElixirData } from 'mind-elixir'

export interface MindMapItem {
  author: number
  content: MindElixirData
  date: string
  name: string
  origin: string
  public: boolean
  updatedAt: string
  __v: number
  _id: string
}

export type MindMapList = MindMapItem[]
