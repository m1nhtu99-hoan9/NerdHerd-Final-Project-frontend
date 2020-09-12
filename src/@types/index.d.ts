/*
  Transient type definitions go here
*/

/** a hack declaring empty type module to avoid type warning regarding 
 * `sync-storage`, which actually use Flow instead of TypeScript
 */ 
declare module 'sync-storage'

/** a hack declaring empty type module to avoid type warning 
 *  regarding `rn-faded-scrollview`
 */ 
declare module 'rn-faded-scrollview'

/** a hack declaring empty type module to avoid type warning 
 *  regarding `react-native-speedometer`
 */ 
declare module 'react-native-speedometer'

/** a hack declaring empty type module to avoid type warning 
 *  regarding `Base64`
 */ 
declare module 'Base64'

type PhoneNum = string

type SearchResult = {
  phone: PhoneNum
  score?: number
}