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


ALTER TABLE Users
ADD OTP VARCHAR(6),
    OTPDateTime DATETIME,
    LastLogin DATETIME,
    LoginPCNo VARCHAR(50);


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
CREATE TABLE AddToCart (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT, -- Foreign key to link the cart with a specific user
    ProductID INT, -- Foreign key to link the cart with a specific product
    Quantity INT NOT NULL,
    AddedDateTime DATETIME NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);


INSERT INTO Products (ProductName, Description, Price,ProductImage)
VALUES
    ('iPhone 13 Pro', 'Apple iPhone 13 Pro with A15 Bionic chip and Pro camera system.', 999.99,'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.slideshow-medium_2x.jpg'),
    ('Samsung Galaxy S21', 'Samsung Galaxy S21 5G with 8K video and Exynos 2100.', 799.99,'https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990blg4ins/gallery/in-galaxy-s21-fe-g990-464368-sm-g990blg4ins-thumb-537060640'),
    ('Sony PlayStation 5', 'Sony PS5 gaming console with 4K Ultra HD Blu-ray.', 499.99,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG8EWm1vwNnXFsblkeOCQbmfXf-3Lm7F7Pn7F62HcB_yBd9BKr7vo36qpqQRUDzcpDbc4&usqp=CAU'),
    ('MacBook Air', 'Apple MacBook Air with M1 chip and Retina display.', 1199.99,'https://photos5.appleinsider.com/gallery/49833-97645-Brydge-ProDock-xl.jpg');
 