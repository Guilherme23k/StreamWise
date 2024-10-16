# StreamWise

Java Restful API criada para gerenciar Streamings e Serviços

## Diagrama de Classes

```mermaid
classDiagram
    class User {
      -Long id
      -String name
      -String email
      -String password
    }
    
    class Service {
      -Long id
      -String name
      -String category
      -Double price
      -LocalDate billingDate
    }

    User "1" o-- "0..n" Service
    

    
```
