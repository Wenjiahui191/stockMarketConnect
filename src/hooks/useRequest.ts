import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import request from '@/network/request'

export interface UseRequestOptions<TData, TParams extends any[]> {
  manual?: boolean
  defaultParams?: TParams
  debounceWait?: number
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: any, params: TParams) => void
}

export interface UseRequestResult<TData, TParams extends any[]> {
  data: Ref<TData | undefined>
  error: Ref<any>
  loading: Ref<boolean>
  run: (...args: TParams) => Promise<TData>
}

export function useRequest<TData = any, TParams extends any[] = any[]>(
  service: (...args: TParams) => Promise<TData>,
  options: UseRequestOptions<TData, TParams> = {}
): UseRequestResult<TData, TParams> {
  const data = ref<TData>()
  const error = ref<any>()
  const loading = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  const run = async (...args: TParams): Promise<TData> => {
    if (options.debounceWait && timer) {
      clearTimeout(timer)
    }
    return new Promise((resolve, reject) => {
      const execute = async () => {
        loading.value = true
        error.value = undefined
        try {
          const res = await service(...args)
          data.value = res
          options.onSuccess?.(res, args)
          resolve(res)
        } catch (e) {
          error.value = e
          options.onError?.(e, args)
          reject(e)
        } finally {
          loading.value = false
        }
      }
      if (options.debounceWait) {
        timer = setTimeout(execute, options.debounceWait)
      } else {
        execute()
      }
    })
  }

  // 自动执行，使用 defaultParams
  if (!options.manual) {
    const params = options.defaultParams || ([] as unknown as TParams)
    run(...params)
  }

  return { data, error, loading, run }
}
