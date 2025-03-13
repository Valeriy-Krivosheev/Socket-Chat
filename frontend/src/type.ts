export interface IMessage {
  user: IUserCreated
  content: {
    text: string
    time: number
  }
  type: 'message' | 'system'
}

export interface IUserCreated {
  id: string
  name: string
  timeEntering: number
}
