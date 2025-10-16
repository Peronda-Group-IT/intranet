CREATE TABLE intranet_groups (
    id INT NOT NULL IDENTITY(1,1),
    name VARCHAR(30) NOT NULL,
    CONSTRAINT PK_intranet_groups PRIMARY KEY (id)
);

CREATE TABLE intranet_user_group_visibility (
    username NVARCHAR(100) PRIMARY KEY,
    visibility NVARCHAR(150) NOT NULL,
    updated_at DATETIME DEFAULT GETDATE()
);
