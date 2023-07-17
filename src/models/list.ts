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

  // added by client
  clone?: MindMapItem
}

export type MindMapList = MindMapItem[]
