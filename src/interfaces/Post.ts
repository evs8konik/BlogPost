import { IDate } from './Date'
import { ITime } from './Time'
import { IUser } from './User'

export interface IPost {
  userId: string
  id: string
  title: string
  body: string
  owner?: IUser
  date?: IDate
  time?: ITime
  picture?: string
  isShow?: boolean
}
