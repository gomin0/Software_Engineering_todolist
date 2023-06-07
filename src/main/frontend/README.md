# Class Diagram
아래와 같이 클래스를 구성한다. (`TBD` 값 주의)  
`setter` 함수는 이전값을 반환한다.

@startuml Classes
class User {
    userID: String_TBD
    userName: String
    userEmail: String
    String getUserID()
    String getUserName()
    String getUserEmail()
}

class List {
    listID: String_TBD
    listName: String
    createdDate: Date
    userID: String
    String getListID()
    String getListListName()
    String getUserID()
    Date getCreatedDate()
    String setListName()
}

class ToDo {
    todoID: String_TBD
    todoName: String
    description: String
    priority: int
    DueDate: Date
    isCompleted: bool
    listID: String
    String getToDoID()
    String getToDoName()
    String getDescription()
    int getPriority()
    Date getDueDate()
    String getListID()
    String setToDoName()
    String setDescription()
    int setPriority()
    Date setDueDate()
    bool setIsCompleted()
}

User *-- List 
List *-- ToDo
@enduml
