export interface Memo {
    id: string
    name: string
    photos: Photo[]
    creationDate: number
}

export interface Photo {
    uri: string
    width: number
    height: number
}

export interface Settings {
    memoListSecured: boolean
}