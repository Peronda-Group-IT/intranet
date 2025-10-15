CREATE TABLE intranet_groups (
    id INT NOT NULL IDENTITY(1,1),
    name VARCHAR(30) NOT NULL,
    CONSTRAINT PK_intranet_groups PRIMARY KEY (id)
);
