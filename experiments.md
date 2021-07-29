# Experiments to make this project run


## About Security rules
1. If at least one rule passes, the query will pass
2. A good practice is keep the following rule:
    ```
      match /{document=**} {
        allow read, write: if false;
      }
      
    ```
    