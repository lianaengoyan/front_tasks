export interface IUser {
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface IAccount extends IUser {
    id: number
    avatar: string
    bio: string
}

export interface IContext {
    user: IAccount
}