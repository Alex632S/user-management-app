<template>
  <div class="container">
    <h1>User Management</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="stats">
        <div class="stat-card">
          <h3>Total Users</h3>
          <p>{{ users.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Active</h3>
          <p>{{ activeUsers }}</p>
        </div>
        <div class="stat-card">
          <h3>Admins</h3>
          <p>{{ adminCount }}</p>
        </div>
      </div>

      <div class="actions">
        <button @click="testAPI" class="btn">
          Refresh Users
        </button>
        
        <button @click="testCreate" class="btn btn-primary">
          Test Create
        </button>
        
        <button 
          @click="testDelete" 
          class="btn btn-danger"
          :disabled="!users.length"
        >
          Test Delete First User
        </button>
      </div>

      <div class="user-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <img :src="user.avatar" alt="" class="avatar">
          <div class="info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <span class="badge" :class="user.role">{{ user.role }}</span>
            <span class="badge" :class="user.status">{{ user.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../types/user'
import { ref, computed, onMounted } from 'vue'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const activeUsers = computed(() => 
  users.value.filter((user: User) => user.status === 'active').length
)

const adminCount = computed(() => 
  users.value.filter((user: User) => user.role === 'admin').length
)

async function testAPI() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('Failed to fetch')
    users.value = await response.json()
    console.log('✅ Users loaded:', users.value.length)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

async function testCreate() {
  const newUser = {
    name: 'Test User',
    email: 'test@example.com',
    role: 'viewer' as const,
    status: 'active' as const
  }
  
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    
    if (!response.ok) throw new Error('Failed to create')
    
    const created = await response.json()
    console.log('✅ User created:', created)
    await testAPI()
  } catch (e) {
    console.error('Create failed:', e)
  }
}

async function testDelete() {
  if (!users.value.length) {
    console.log('No users to delete')
    return
  }
  
  const firstUser = users.value[0]
  if (!firstUser) return
  
  try {
    const response = await fetch(`/api/users/${firstUser.id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) throw new Error('Failed to delete')
    
    console.log('✅ User deleted:', firstUser.id)
    await testAPI()
  } catch (e) {
    console.error('Delete failed:', e)
  }
}

onMounted(() => {
  testAPI()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.actions {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge.admin { background: #ef4444; color: white; }
.badge.editor { background: #3b82f6; color: white; }
.badge.viewer { background: #10b981; color: white; }
.badge.active { background: #10b981; color: white; }
.badge.blocked { background: #6b7280; color: white; }
</style>