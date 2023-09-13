--create database MyShopping
--use MyShopping
--USE MASTER
--DROP DATABASE MyShopping

CREATE TABLE UserRoles (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName VARCHAR(50) NOT NULL
);

INSERT INTO UserRoles (RoleName)
VALUES
    ('Customer'),          
    ('PremiumCustomer'),     
    ('Admin');             


CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    RegistrationDate DATETIME NOT NULL
);

CREATE TABLE UserRoleMapping (
    MappingID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    RoleID INT,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (RoleID) REFERENCES UserRoles (RoleID)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName VARCHAR(100) NOT NULL,
	ProductImage NVARCHAR(MAX) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
);


CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);


INSERT INTO Products (ProductName, Description, Price,ProductImage)
VALUES
    ('iPhone 13 Pro', 'Apple iPhone 13 Pro with A15 Bionic chip and Pro camera system.', 999.99,),
    ('Samsung Galaxy S21', 'Samsung Galaxy S21 5G with 8K video and Exynos 2100.', 799.99,),
    ('Sony PlayStation 5', 'Sony PS5 gaming console with 4K Ultra HD Blu-ray.', 499.99,),
    ('MacBook Air', 'Apple MacBook Air with M1 chip and Retina display.', 1199.99,),
 