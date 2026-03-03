1. What if user puts m, f or male, female or M, F or Male, Female

```sql
DELIMITER //

CREATE TRIGGER before_user_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.gender IN ('male', 'm', 'MALE', 'M') THEN
        SET NEW.gender = 'M';
    ELSEIF NEW.gender IN ('female', 'f', 'FEMALE', 'F') THEN
        SET NEW.gender = 'F';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid gender value';
    END IF;
END; //

DELIMITER ;
```

create table Senior(S_id int(4) Primary key Not null, S_name varchar(25) Not null, age int(2) not null, gender_id not null, city_id 
