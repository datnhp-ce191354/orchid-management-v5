IF DB_ID('SBA301_OrchidDB') IS NULL
BEGIN
    CREATE DATABASE SBA301_OrchidDB;
END;
GO

USE SBA301_OrchidDB;
GO

IF OBJECT_ID('dbo.Orchid', 'U') IS NOT NULL
    DROP TABLE dbo.Orchid;
GO

CREATE TABLE Orchid (
    OrchidID INT IDENTITY(1,1) PRIMARY KEY,
    OrchidName NVARCHAR(100) NOT NULL,
    IsNatural BIT NOT NULL,
    OrchidDescription NVARCHAR(500),
    OrchidCategory NVARCHAR(100),
    IsAttractive BIT NOT NULL,
    OrchidURL NVARCHAR(500)
);
GO

INSERT INTO Orchid (OrchidName, IsNatural, OrchidDescription, OrchidCategory, IsAttractive, OrchidURL)
VALUES
    (N'Taichung Beauty', 1, N'Popular Cattleya orchid with vibrant color', N'Cattleya', 1, N'https://upload.wikimedia.org/wikipedia/commons/4/49/Phalaenopsis_Orchid.jpg'),
    (N'Phalaenopsis White', 1, N'White moth orchid for interior decoration', N'Phalaenopsis', 1, N'https://upload.wikimedia.org/wikipedia/commons/4/49/Phalaenopsis_Orchid.jpg'),
    (N'Dendrobium Purple', 0, N'Hybrid purple dendrobium orchid', N'Dendrobium', 0, N'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cooktown_orchids_and_bud.jpg/500px-Cooktown_orchids_and_bud.jpg');
GO
