export type Keys = 0 | 1 | 2

export type episode = string

export interface FetchedData {
  __typename?: string,
  image: string,
  id: number,
  name: string,
  gender: string,
  episode: Record<episode, string>[],
  species: string
  favorite?: boolean
}
