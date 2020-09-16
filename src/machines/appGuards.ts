import { AppMachineContext, AppMachineEvent } from '../@types/machines'

type TGuard = (ctx: AppMachineContext, event?: AppMachineEvent) => boolean

const isTokenEmpty: TGuard = (ctx) => !ctx.token
//`event.data` returns an object implementing `apisauce`'s ApiOkResponse
const isSuccessResp: TGuard = (_, event) => event?.data.ok as boolean
const isNotSuccessResp: TGuard = (_, event) => event?.data.problem as boolean
const hasOtpNotLoaded: TGuard = (ctx) => !ctx.otp

export { isTokenEmpty, isNotSuccessResp, isSuccessResp, hasOtpNotLoaded }
