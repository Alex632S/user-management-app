```mermaid
flowchart TD
    subgraph Client ["Клиентская часть"]
        UI[Vue.js / Nuxt приложение]
        API_Calls[API вызовы]
    end

    subgraph MSW ["MSW Mock Service Worker"]
        direction TB
        Browser[setupWorker<br/>msw/browser]
        Node[setupServer<br/>msw/node]

        subgraph Handlers ["Обработчики запросов"]
            direction TB
            GET_List[GET /api/users<br/>Список с фильтрацией]
            GET_One[GET /api/users/:id<br/>Получить пользователя]
            POST_Create[POST /api/users<br/>Создать пользователя]
            PUT_Update[PUT /api/users/:id<br/>Полное обновление]
            PATCH_Update[PATCH /api/users/:id<br/>Частичное обновление]
            DELETE[DELETE /api/users/:id<br/>Удалить]

            subgraph Additional ["Дополнительные эндпоинты"]
                Block[POST /api/users/:id/block<br/>Блокировка]
                Unblock[POST /api/users/:id/unblock<br/>Разблокировка]
                Stats[GET /api/users/stats<br/>Статистика]
                Batch[POST /api/users/batch-delete<br/>Массовое удаление]
                Templates[GET /api/users/templates<br/>Шаблоны]
            end
        end
    end

    subgraph Data ["Слой данных"]
        direction TB
        Users[(Массив users)]
        MockData["generateMockUsers()"]
        Validation["validateUserData()"]

        subgraph Types ["Типы TypeScript"]
            User[User interface]
            NewUser[NewUser type]
            UpdateUser[UpdateUser type]
            ExtendedUser[ExtendedUser]
            Responses[UsersResponse<br/>UserResponse<br/>ApiError]
        end
    end

    subgraph Utils ["Вспомогательные функции"]
        Generate[Генерация данных:<br/>- avatar<br/>- phone<br/>- department<br/>- location]
        Validators[Валидация:<br/>- isValidEmail<br/>- isValidPhone<br/>- formatPhone]
        Templates[Шаблоны:<br/>- admin<br/>- editor<br/>- viewer<br/>- blocked]
    end

    Client --> API_Calls
    API_Calls --> MSW

    Browser --> Handlers
    Node --> Handlers

    Handlers --> Data
    Data --> Utils

    GET_List --> Users
    GET_One --> Users
    POST_Create --> Users
    PUT_Update --> Users
    PATCH_Update --> Users
    DELETE --> Users
    Block --> Users
    Unblock --> Users
    Stats --> Users
    Batch --> Users

    Users --> MockData
    Users --> Validation

    MockData --> Generate
    Validation --> Validators
    Templates --> Handlers

    classDef client fill:#e1f5fe,stroke:#01579b
    classDef msw fill:#fff3e0,stroke:#ff6f00
    classDef data fill:#e8f5e8,stroke:#1b5e20
    classDef utils fill:#f3e5f5,stroke:#4a148c
    classDef types fill:#ffebee,stroke:#b71c1c

    class Client client
    class MSW,Browser,Node,Handlers,Additional msw
    class Data,Users,Validation data
    class Utils,Generate,Validators utils
    class Types,User,NewUser,UpdateUser,ExtendedUser,Responses types
```

## Диаграмма потоков данных:

```mermaid
sequenceDiagram
    participant Client as Клиент
    participant API as API Endpoint
    participant Validation as Валидация
    participant Data as Данные
    participant Response as Ответ

    Note over Client,Response: Создание пользователя

    Client->>API: POST /api/users
    API->>Validation: validateUserData()
    Validation-->>API: {valid, errors}

    alt Валидация успешна
        API->>Data: Создать пользователя
        Data-->>API: newUser
        API->>Response: 201 Created
        Response-->>Client: {user, message}
    else Ошибка валидации
        API->>Response: 400 Bad Request
        Response-->>Client: {errors}
    end

    Note over Client,Response: Получение списка с фильтрацией

    Client->>API: GET /api/users?role=admin&search=john
    API->>Data: filterUsers(role, search)
    Data-->>API: filteredUsers
    API->>Response: 200 OK
    Response-->>Client: {users, total, filters}
```

## Модель данных:

```mermaid
classDiagram
    class User {
        +string id
        +string name
        +string email
        +string role
        +string status
        +string registeredAt
        +string avatar
        +string lastLogin
        +string phone
        +validate()
    }

    class NewUser {
        +string name
        +string email
        +string role
        +string status
        +string phone
    }

    class UpdateUser {
        +string id
        +string name
        +string email
        +string role
        +string status
        +string phone
        +string avatar
    }

    class ExtendedUser {
        +string department
        +string location
        +string projects
        +string commits
    }

    class ApiResponse {
        +string message
        +string error
        +object errors
    }

    class UsersResponse {
        +array users
        +number total
        +object filters
    }

    User <|-- ExtendedUser
    NewUser --|> User
    UpdateUser --|> User
    UsersResponse *-- User
    ApiResponse <|-- UsersResponse
```

## Схема маршрутизации:

```mermaid
graph LR
    subgraph Public ["Публичные маршруты"]
        Root["Root"] --> Dashboard["Dashboard"]
        Blog["Blog"] --> BlogPage["Blog Page"]
        Products["Products"] --> ProductsPage["Products Page"]
    end

    subgraph Admin ["Admin маршруты (SPA)"]
        AdminRoot["Admin Root"] --> AdminPanel["Admin Panel"]
        AdminDashboard["Admin Dashboard"] --> DashboardView["Dashboard View"]
        AdminUsers["Admin Users"] --> UsersView["Users Management"]
        AdminSettings["Admin Settings"] --> SettingsView["Settings"]
    end

    subgraph API ["API маршруты (MSW)"]
        APIUsers["API Users"] --> UserHandlers["User Handlers"]
        APIUsersId["API Users ID"] --> SingleUser["Single User"]
        APIUsersStats["API Users Stats"] --> Stats["Statistics"]
        APIUsersBatch["API Users Batch"] --> BatchDelete["Batch Delete"]
    end

    Public --> |SSR| Nuxt["Nuxt Server"]
    Admin --> |SPA| Client["Client Side"]
    API --> |Mock| MSW["MSW Worker"]
```

Эти диаграммы показывают:

1. **Архитектуру** - взаимодействие клиента с MSW и данными
2. **Потоки данных** - последовательность операций при запросах
3. **Модели данных** - структуру типов и их отношения
4. **Маршрутизацию** - как организованы публичные и admin маршруты
