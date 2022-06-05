import { fetchArtist } from '@/web/api/artist'
import { IpcChannels } from '@/shared/IpcChannels'
import { APIs } from '@/shared/CacheAPIs'
import {
  FetchArtistParams,
  ArtistApiNames,
  FetchArtistResponse,
} from '@/shared/api/Artist'
import { useQuery } from 'react-query'

export default function useArtists(ids: number[]) {
  return useQuery(
    ['fetchArtists', ids],
    () => Promise.all(ids.map(id => fetchArtist({ id }, false))),
    {
      enabled: !!ids && ids.length > 0,
      staleTime: 5 * 60 * 1000, // 5 mins
      // placeholderData: (): FetchArtistResponse[] =>
      //   window.ipcRenderer?.sendSync(IpcChannels.GetApiCacheSync, {
      //     api: APIs.Artist,
      //     query: {
      //       ids,
      //     },
      //   }),
    }
  )
}
