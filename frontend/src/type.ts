export interface IMessage {
  user: IUserCreated
  text: string
}

export interface IUserCreated {
  name: string | null
  timeEntering: Date | null
}
