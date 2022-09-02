--TABLA ADMINS
CREATE TABLE ir_administrator(
    admin_id SERIAL PRIMARY KEY,
    admin_username VARCHAR(25) NOT NULL,
    admin_password VARCHAR(500) NOT NULL,
    admin_name VARCHAR(25) NOT NULL,
    admin_lastname VARCHAR(25) NOT NULL,
	admin_email VARCHAR (255) NOT NULL UNIQUE,
    admin_active INT NOT NULL DEFAULT 1,
    admin_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ir_administrator (admin_username, admin_password, admin_name, admin_lastname, admin_email) VALUES('admin', '$2a$10$VjNAbm5bGBIZW1L1uk2hXuN07/wPON5o4dmP8D7CMvIupjbMt9QxG', 'Usuario01', 'iRescue',  'administrator@irescue.com');
INSERT INTO ir_administrator (admin_username, admin_password, admin_name, admin_lastname, admin_email) VALUES('user', '$2a$10$VjNAbm5bGBIZW1L1uk2hXuN07/wPON5o4dmP8D7CMvIupjbMt9QxG', 'Usuario02', 'iRescue',  'user01@irescue.com');

--CREATE TABLE RECOVER CODES 
CREATE TABLE ir_recover_codes (
    code_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    expiration_date VARCHAR,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ir_users_id_fkey FOREIGN KEY (user_id)
    REFERENCES ir_users (user_id)
);


--CREATE TABLE GENDER
CREATE TABLE ir_gender (
    gender_id SERIAL PRIMARY KEY,
    gender_name VARCHAR(150) NOT NULL,
    gender_active INT NOT NULL DEFAULT 1,
    gender_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gender_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ir_gender(gender_id, gender_name) VALUES(0, 'Pendiente');
INSERT INTO ir_gender(gender_name) VALUES( 'Masculino');
INSERT INTO ir_gender(gender_name) VALUES( 'Femenino');

CREATE TABLE ir_countries(
    country_id SERIAL PRIMARY KEY NOT NULL,
    country_name VARCHAR(50) NOT NULL,
    country_active INT NOT NULL DEFAULT 1,
    country_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    country_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ir_countries (country_id, country_name) VALUES (0,'Pendiente');
INSERT INTO ir_countries (country_id, country_name) VALUES (1,'El SALVADOR');


CREATE TABLE ir_state(
    state_id SERIAL PRIMARY KEY NOT NULL,
    state_name VARCHAR(50) NOT NULL,
    country_id INTEGER NOT NULL DEFAULT 1,
    state_active INT NOT NULL DEFAULT 1,
    state_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT ir_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES ir_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO ir_state (state_id, state_name) VALUES (0, 'Pendiente');
INSERT INTO ir_state (state_id, state_name) VALUES (1, 'Ahuachapán');
INSERT INTO ir_state (state_id, state_name) VALUES (2, 'Cabañas');
INSERT INTO ir_state (state_id, state_name) VALUES (3, 'Chalatenango');
INSERT INTO ir_state (state_id, state_name) VALUES (4, 'Cuscatlán');
INSERT INTO ir_state (state_id, state_name) VALUES (5, 'La Libertad');
INSERT INTO ir_state (state_id, state_name) VALUES (6, 'La Unión');
INSERT INTO ir_state (state_id, state_name) VALUES (7, 'La Paz');
INSERT INTO ir_state (state_id, state_name) VALUES (8, 'Morazán');
INSERT INTO ir_state (state_id, state_name) VALUES (9, 'San Miguel');
INSERT INTO ir_state (state_id, state_name) VALUES (10, 'San Vicente');
INSERT INTO ir_state (state_id, state_name) VALUES (11, 'Santa Ana');
INSERT INTO ir_state (state_id, state_name) VALUES (12, 'San Salvador');
INSERT INTO ir_state (state_id, state_name) VALUES (13, 'Sonsonate');
INSERT INTO ir_state (state_id, state_name) VALUES (14, 'Usulután');


CREATE TABLE ir_municipalities(
    municipality_id SERIAL PRIMARY KEY NOT NULL,
    state_id INTEGER NOT NULL,
    municipality_name VARCHAR(50) NOT NULL,
    municipality_active INT NOT NULL DEFAULT 1,
    municipality_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    municipality_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ir_municipalities_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES ir_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (0, 'Pendiente');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Ahuachapán');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Apaneca');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Atiquizaya');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Concepción de Ataco');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'El Refugio');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Guaymango');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Jujutla');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'San Francisco Menéndez');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'San Lorenzo');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'San Pedro Puxtla');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Tacuba');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (1 , 'Turín');

INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Cinquera');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Dolores');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Guacotecti');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Ilobasco');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Jutiapa');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'San Isidro');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Sensuntepeque');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Tejutepeque');
INSERT INTO ir_municipalities (state_id, municipality_name) VALUES (2 , 'Victoria');

CREATE TABLE ir_personal_documents(
    document_id SERIAL PRIMARY KEY NOT NULL,
    per_document_name VARCHAR NOT NULL,
    per_document_description TEXT,
    per_document_active INT NOT NULL DEFAULT 1,
    per_document_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    per_document_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ir_personal_documents (document_id, per_document_name, per_document_description) VALUES (0,'Pendiente', 'Pendiente');
INSERT INTO ir_personal_documents (document_id, per_document_name, per_document_description) VALUES (1,'DUI', '.');
INSERT INTO ir_personal_documents (document_id, per_document_name, per_document_description) VALUES (2,'NIT', '.');

CREATE TABLE ir_users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    user_password VARCHAR(1000) NOT NULL,
    user_fcm_token VARCHAR NOT NULL, 
    user_name VARCHAR(250) NOT NULL,
    user_lastname VARCHAR(250) NOT NULL,
    document_id INTEGER NOT NULL DEFAULT 0,
    user_document_detail VARCHAR,
    user_email VARCHAR(250) UNIQUE NOT NULL,
    user_cellphone VARCHAR(15) UNIQUE NOT NULL,
    user_country_id INTEGER NOT NULL DEFAULT 0,
    user_state_id INTEGER NOT NULL DEFAULT 0,
    user_municipality_id INTEGER NOT NULL DEFAULT 0,
    user_photo_profile VARCHAR(250),
    user_gender_id INTEGER NOT NULL DEFAULT 0,
    user_active INT NOT NULL DEFAULT 1,
    user_reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
    CONSTRAINT ir_countries_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES ir_countries (country_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT ir_state_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES ir_state (state_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT ir_municipalities_municipality_id_fkey FOREIGN KEY (municipality_id)
    REFERENCES ir_municipalities (municipality_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT ir_gender_id_fkey FOREIGN KEY (gender_id)
    REFERENCES ir_gender (gender_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,

    CONSTRAINT ir_personal_documents_id_fkey FOREIGN KEY (document_id)
    REFERENCES ir_personal_documents (document_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);


CREATE TABLE chq_notification (
    notification_id SERIAL PRIMARY KEY NOT NULL,
    audience_id INTEGER NOT NULL, 
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(250),
    description TEXT,
    picture VARCHAR,
    active INT NOT NULL DEFAULT 1,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



