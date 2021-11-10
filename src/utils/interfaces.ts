export interface IUserData {
  name: string
  email: string
  uid: string
}

export interface IRegister {
  name: string
  email: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IPoll {
  NO_ID_FIELD?: string;
  title: string
  options: IPollOption[]
  name: string
  uid: string
  id?: string
  voteInfo: IVoteInfo[]
  createdOn: Date
}

export interface IPollOption {
  title: string
  votes: number
}

export interface IVoteInfo {
  name: string
  email: string
  uid: string
  option: string
}