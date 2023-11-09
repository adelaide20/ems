-- admin login details table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE  users  (
   id SERIAL PRIMARY KEY UNIQUE,
   name varchar(255),
   email varchar(255) UNIQUE,
   password varchar (255)
  
);


-- employee details table
DROP TABLE IF EXISTS employees CASCADE;
CREATE TABLE  employees  (
   emp_id SERIAL PRIMARY KEY UNIQUE,
   first_name varchar (255),
   last_name varchar (255),
   email varchar(255) UNIQUE,
   gender varchar(255),
   contactno varchar (15)
);


-- employment details table
DROP TABLE IF EXISTS employment CASCADE;
CREATE TABLE  employment  (
   id SERIAL PRIMARY KEY UNIQUE,
   employee INT,
   position varchar(255),
   emp_status varchar(255) DEFAULT 'active',
   start_date date,
   salary DECIMAL(10,2),
   end_date date,
   visibility BOOLEAN DEFAULT true,
   FOREIGN KEY (employee) REFERENCES employees(emp_id)
);



