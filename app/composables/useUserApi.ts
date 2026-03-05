import type {
  User,
  ExtendedUser,
  NewUser,
  UpdateUser,
  UserFilters,
  UsersResponse,
  UserResponse,
  UserStats,
  BatchDeleteRequest,
  BatchDeleteResponse,
  ApiError
} from '~/types/user'

export const useUserApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || '/api'

  // GET /users
  const getUsers = async (filters?: UserFilters, extended = false) => {
    const params = new URLSearchParams()

    if (filters?.role && filters.role !== 'all') {
      params.append('role', filters.role)
    }
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status)
    }
    if (filters?.search) {
      params.append('search', filters.search)
    }
    if (extended) {
      params.append('extended', 'true')
    }

    return $fetch<UsersResponse>(`${baseURL}/users`, {
      params,
      // @ts-ignore - $fetch типы из Nuxt
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // GET /users/:id
  const getUserById = async (id: string, extended = false) => {
    const params = extended ? '?extended=true' : ''
    return $fetch<UserResponse>(`${baseURL}/users/${id}${params}`, {
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // POST /users
  const createUser = async (data: NewUser) => {
    return $fetch<UserResponse>(`${baseURL}/users`, {
      method: 'POST',
      body: data,
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // PUT /users/:id
  const updateUser = async (id: string, data: UpdateUser) => {
    return $fetch<UserResponse>(`${baseURL}/users/${id}`, {
      method: 'PUT',
      body: data,
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // PATCH /users/:id
  const patchUser = async (id: string, data: UpdateUser) => {
    return $fetch<UserResponse>(`${baseURL}/users/${id}`, {
      method: 'PATCH',
      body: data,
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // DELETE /users/:id
  const deleteUser = async (id: string) => {
    return $fetch<UserResponse>(`${baseURL}/users/${id}`, {
      method: 'DELETE',
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // POST /users/:id/block
  const blockUser = async (id: string) => {
    return $fetch<UserResponse>(`${baseURL}/users/${id}/block`, {
      method: 'POST',
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // POST /users/:id/unblock
  const unblockUser = async (id: string) => {
    return $fetch<UserResponse>(`${baseURL}/users/${id}/unblock`, {
      method: 'POST',
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // GET /users/stats
  const getUserStats = async () => {
    return $fetch<UserStats>(`${baseURL}/users/stats`, {
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // POST /users/batch-delete
  const batchDeleteUsers = async (ids: string[]) => {
    return $fetch<BatchDeleteResponse>(`${baseURL}/users/batch-delete`, {
      method: 'POST',
      body: { ids } as BatchDeleteRequest,
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  // GET /users/templates
  const getUserTemplates = async () => {
    return $fetch(`${baseURL}/users/templates`, {
      onResponseError: ({ response }) => {
        throw response._data as ApiError
      }
    })
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    blockUser,
    unblockUser,
    getUserStats,
    batchDeleteUsers,
    getUserTemplates
  }
}
function useRuntimeConfig() {
  return {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
}
