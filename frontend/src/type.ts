export interface IMessage {
  user: IUserCreated
  content: {
    text: string
    time: number
  }
  type: 'message' | 'system'
}

export interface IUserCreated {
  _id: string
  username: string
  password: string
  timeEntering: number
}

export interface IFormDataReg {
  login: string
  password: string
  repeatPassword?: string
  isTermsAgreed?: boolean
}

export type TFormDataAuth = Pick<IFormDataReg, 'login' | 'password'>

export interface IError {
  id: string
  text: string
}
