DROP DATABASE IF EXISTS company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE allEmployees (
    position INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(25) NULL,
    last_name VARCHAR(25) NULL,
    title VARCHAR(50) NULL,
    department VARCHAR(50) NULL,
    salary INT NOT NULL,
    manager VARCHAR(50) NULL,
    PRIMARY KEY (position)
);

INSERT INTO allEmployees (first_name, last_name, title, department, salary, manager)

VALUES
('Jim', 'Jones', 'Account Manager', 'Sales', 75000, 'Rick Ross'),
('GZA', 'The Genius', 'Controller', 'Accounting', 100000, 'Bobby Digital'),
('Meek', 'Mill', 'Talent Acquisition', 'Human Resources', 85000, 'Yeezy'),
('DJ', 'Khaled', 'Marketing Agent', 'Marketing', 97000, 'Nas');