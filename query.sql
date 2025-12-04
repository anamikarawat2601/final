CREATE DATABASE ;

USE myapp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
SHOW DATABASES;
DESCRIBE myapp;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM myapp;
TRUNCATE TABLE users;
CREATE DATABASE Login_sign;
USE Login_sign;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
SELECT * FROM users;
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL
);
SELECT * FROM profile;
ALTER TABLE profile
RENAME COLUMN `desc` TO details;
SELECT * FROM profile;
ALTER TABLE profile
RENAME COLUMN name TO username;
ALTER TABLE users 
ADD COLUMN age VARCHAR(255) ;
SELECT * FROM users;
ALTER TABLE users 
ADD COLUMN city VARCHAR(255) ;
SELECT * FROM users;
ALTER TABLE users
ADD COLUMN phoneno VARCHAR(15);
// store table;
USE myapp;
CREATE TABLE store(
id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1),
    latitude DECIMAL(10,6) NOT NULL,
    longitude DECIMAL(10,6) NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    open_hours VARCHAR(100)
)
SELECT * from store;
SELECT * from users;
DROP TABLE store;
INSERT INTO store (name, rating, latitude, longitude, address, phone_number, open_hours) VALUES
('AutoFix Garage', 4.5, 40.712776, -74.005974, '123 Main St, New York, NY', '+1-555-123-4567', '8am - 6pm'),
('Speedy Repairs', 4.2, 40.730610, -73.935242, '22 Queens Blvd, Queens, NY', '+1-555-234-5678', '9am - 7pm'),
('GaragePro Mechanics', 4.8, 40.758896, -73.985130, '45 Midtown Ave, Manhattan, NY', '+1-555-345-6789', '7am - 5pm'),
('FixIt Auto Care', 3.9, 40.706192, -74.009160, '78 Broad St, New York, NY', '+1-555-456-7890', '8am - 8pm'),
('WheelWorks Garage', 4.7, 40.742054, -74.001524, '90 10th Ave, New York, NY', '+1-555-567-8901', '9am - 6pm');
SELECT * from store;
INSERT INTO store (name, rating, latitude, longitude, address, phone_number, open_hours, services) VALUES
('Manhattan Auto Clinic', 4.6, 40.751620, -73.977230, '200 Park Ave, New York, NY', '+1-555-678-9012', '8am - 6pm', 'Oil change, engine diagnostics, brakes'),
('Queens QuickFix', 4.1, 40.744000, -73.948900, '88 Northern Blvd, Queens, NY', '+1-555-789-0123', '9am - 7pm', 'Tires, brakes, general service'),
('Bronx Auto Care', 4.3, 40.844782, -73.864827, '450 Fordham Rd, Bronx, NY', '+1-555-890-1234', '8am - 8pm', 'Tune-ups, tire rotation, repairs'),
('Brooklyn Motors', 4.7, 40.678178, -73.944158, '310 Flatbush Ave, Brooklyn, NY', '+1-555-901-2345', '9am - 6pm', 'General repairs, painting, diagnostics'),
('Downtown Car Care', 4.4, 40.707512, -74.011318, '15 Wall St, New York, NY', '+1-555-012-3456', '7am - 5pm', 'Oil change, batteries, inspections'),
('Harlem Auto Service', 4.2, 40.811550, -73.946477, '230 W 125th St, Harlem, NY', '+1-555-234-5670', '8am - 7pm', 'Transmission, brakes, alignment'),
('East Village Garage', 4.0, 40.726477, -73.981533, '120 Ave A, New York, NY', '+1-555-345-6781', '9am - 6pm', 'Tire change, diagnostics, battery replacement'),
('SoHo Auto Works', 4.9, 40.724330, -74.001850, '400 Broome St, SoHo, NY', '+1-555-456-7892', '8am - 6pm', 'Luxury car service, detailing, brakes'),
('Chelsea Garage', 4.5, 40.746500, -74.001374, '230 W 20th St, New York, NY', '+1-555-567-8903', '9am - 7pm', 'Oil change, suspension, air conditioning'),
('ParkSlope Mechanics', 4.3, 40.671072, -73.981918, '95 7th Ave, Brooklyn, NY', '+1-555-678-9014', '8am - 5pm', 'Tune-ups, batteries, engine repair'),
('Upper West Auto', 4.6, 40.787010, -73.975367, '300 Columbus Ave, New York, NY', '+1-555-789-0125', '8am - 6pm', 'Inspections, brakes, general repair'),
('Greenpoint Garage', 4.1, 40.730230, -73.954910, '45 Greenpoint Ave, Brooklyn, NY', '+1-555-890-1236', '9am - 6pm', 'Oil change, diagnostics, tires'),
('Astoria Auto Clinic', 4.4, 40.764357, -73.923462, '25 31st St, Astoria, NY', '+1-555-901-2347', '8am - 7pm', 'Brakes, battery, oil service'),
('Williamsburg Garage', 4.8, 40.708115, -73.957070, '50 Wythe Ave, Brooklyn, NY', '+1-555-012-3458', '9am - 6pm', 'Performance tuning, tire change, detailing'),
('Lower East Auto Works', 4.0, 40.718092, -73.987450, '220 Grand St, New York, NY', '+1-555-234-5679', '8am - 6pm', 'Tires, oil, diagnostics'),
('Jamaica Auto Center', 4.2, 40.702678, -73.788968, '980 Liberty Ave, Queens, NY', '+1-555-345-6780', '9am - 8pm', 'Repairs, oil, brakes'),
('Long Island City Mechanics', 4.3, 40.748000, -73.939000, '21st St, Long Island City, NY', '+1-555-456-7893', '8am - 7pm', 'Diagnostics, oil change, engine work'),
('Flatiron Auto Repair', 4.7, 40.741061, -73.989699, '75 W 23rd St, Flatiron, NY', '+1-555-567-8904', '9am - 6pm', 'General maintenance, suspension, brakes'),
('Tribeca Auto Spa', 4.9, 40.719526, -74.008993, '55 Hudson St, Tribeca, NY', '+1-555-678-9015', '8am - 6pm', 'Luxury service, detailing, performance tuning'),
('Sunset Park Garage', 4.1, 40.645532, -74.012385, '450 4th Ave, Brooklyn, NY', '+1-555-789-0126', '9am - 7pm', 'Brakes, engine service, oil change');
INSERT INTO store(name, rating, latitude, longitude, address, phone_number, open_hours) VALUES
('Manhattan Auto Clinic', 4.6, 40.751620, -73.977230, '200 Park Ave, New York, NY', '+1-555-678-9012', '8am - 6pm'),
('Queens QuickFix', 4.1, 40.744000, -73.948900, '88 Northern Blvd, Queens, NY', '+1-555-789-0123', '9am - 7pm'),
('Bronx Auto Care', 4.3, 40.844782, -73.864827, '450 Fordham Rd, Bronx, NY', '+1-555-890-1234', '8am - 8pm'),
('Brooklyn Motors', 4.7, 40.678178, -73.944158, '310 Flatbush Ave, Brooklyn, NY', '+1-555-901-2345', '9am - 6pm'),
('Downtown Car Care', 4.4, 40.707512, -74.011318, '15 Wall St, New York, NY', '+1-555-012-3456', '7am - 5pm'),
('Harlem Auto Service', 4.2, 40.811550, -73.946477, '230 W 125th St, Harlem, NY', '+1-555-234-5670', '8am - 7pm'),
('East Village Garage', 4.0, 40.726477, -73.981533, '120 Ave A, New York, NY', '+1-555-345-6781', '9am - 6pm'),
('SoHo Auto Works', 4.9, 40.724330, -74.001850, '400 Broome St, SoHo, NY', '+1-555-456-7892', '8am - 6pm'),
('Chelsea Garage', 4.5, 40.746500, -74.001374, '230 W 20th St, New York, NY', '+1-555-567-8903', '9am - 7pm'),
('ParkSlope Mechanics', 4.3, 40.671072, -73.981918, '95 7th Ave, Brooklyn, NY', '+1-555-678-9014', '8am - 5pm'),
('Upper West Auto', 4.6, 40.787010, -73.975367, '300 Columbus Ave, New York, NY', '+1-555-789-0125', '8am - 6pm'),
('Greenpoint Garage', 4.1, 40.730230, -73.954910, '45 Greenpoint Ave, Brooklyn, NY', '+1-555-890-1236', '9am - 6pm'),
('Astoria Auto Clinic', 4.4, 40.764357, -73.923462, '25 31st St, Astoria, NY', '+1-555-901-2347', '8am - 7pm'),
('Williamsburg Garage', 4.8, 40.708115, -73.957070, '50 Wythe Ave, Brooklyn, NY', '+1-555-012-3458', '9am - 6pm'),
('Lower East Auto Works', 4.0, 40.718092, -73.987450, '220 Grand St, New York, NY', '+1-555-234-5679', '8am - 6pm'),
('Jamaica Auto Center', 4.2, 40.702678, -73.788968, '980 Liberty Ave, Queens, NY', '+1-555-345-6780', '9am - 8pm'),
('Long Island City Mechanics', 4.3, 40.748000, -73.939000, '21st St, Long Island City, NY', '+1-555-456-7893', '8am - 7pm'),
('Flatiron Auto Repair', 4.7, 40.741061, -73.989699, '75 W 23rd St, Flatiron, NY', '+1-555-567-8904', '9am - 6pm'),
('Tribeca Auto Spa', 4.9, 40.719526, -74.008993, '55 Hudson St, Tribeca, NY', '+1-555-678-9015', '8am - 6pm'),
('Sunset Park Garage', 4.1, 40.645532, -74.012385, '450 4th Ave, Brooklyn, NY', '+1-555-789-0126', '9am - 7pm');
