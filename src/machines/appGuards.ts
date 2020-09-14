import { AppMachineContext, AppMachineEvent } from '../@types/machines'

const isTokenEmpty = (ctx: AppMachineContext) => !ctx.token
// @ts-ignore
const isSuccessResp = (_, event: AppMachineEvent) => event.data.ok
// @ts-ignore
const isNotSuccessResp = (_, event: AppMachineEvent) => event.data.problem

export { isTokenEmpty, isNotSuccessResp, isSuccessResp }
