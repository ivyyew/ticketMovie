-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2022 at 05:46 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlineTicketMovie`
--
CREATE DATABASE IF NOT EXISTS `online_ticket_movie` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `online_ticket_movie`;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `bookingDate` date NOT NULL,
  `bookingTime` varchar(55) NOT NULL,
  `status` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`bookingID`, `quantity`, `bookingDate`, `bookingTime`, `status`, `userID`, `movieID`) VALUES
(1, 2, '2021-02-16', '9.00a.m.', 'Collected', 2, 1),
(2, 1, '2021-02-17', '12.00p.m.', 'Collected', 2, 3),
(3, 2, '2021-02-18', '9.00p.m.', 'Collected', 2, 6),
(4, 2, '2021-03-04', '9.00p.m.', 'in process', 2, 7),
(5, 1, '2021-07-23', '12.00p.m.', 'in process', 4, 1),
(6, 2, '2021-07-23', '3.00p.m.', 'in process', 4, 2),
(7, 2, '2021-07-31', '12.00p.m.', 'Collected', 4, 1),
(8, 1, '2021-07-31', '12.00p.m.', 'in process', 4, 1),
(9, 1, '2021-07-30', '12.00p.m.', 'in process', 4, 1),
(10, 1, '2021-07-24', '6.00p.m.', 'in process', 4, 1),
(11, 1, '2021-07-31', '9.00a.m.', 'in process', 4, 1),
(12, 1, '2021-07-24', '12.00p.m.', 'in process', 4, 1),
(13, 1, '2021-07-24', '3.00p.m.', 'in process', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieID` int(11) NOT NULL,
  `movieName` varchar(100) NOT NULL,
  `movieDescription` text NOT NULL,
  `movieImage` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `ticketPrice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieID`, `movieName`, `movieDescription`, `movieImage`, `duration`, `ticketPrice`) VALUES
(1, 'The Invisible Man', 'The Invisible Man is a 2020 Australian-American science fiction horror film written and directed by Leigh Whannell, loosely based on the novel of the same name by H. G. Wells.', 'movie-The Invisible Man.jpg', 120, 21.5),
(2, 'Avatar', 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron and starring Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver.', 'avatar.jpg', 180, 18.9),
(3, 'Doctor Strange', 'Doctor Strange is a 2016 American superhero film based on the Marvel Comics character of the same name.', 'doctor strange.jpg', 178, 16.3),
(4, 'Wonder Woman', 'Wonder Woman is a fictional superheroine appearing in American comic books published by DC Comics.', 'movie-Wonder Woman.jpg', 125, 21.9),
(5, 'Thor', 'Thor is a 2011 American superhero film based on the Marvel Comics character of the same name.', 'thor.jpg', 150, 20.9),
(6, 'The Conjuring 2', 'The Conjuring 2 is a 2016 American supernatural horror film, directed by James Wan. The screenplay is by Chad Hayes, Carey W. Hayes, Wan, and David Leslie Johnson.', 'movie-The Conjuring 2.jpg', 130, 18.9),
(7, 'Captain America', 'During World War II, Steve Rogers decides to volunteer in an experiment that transforms his weak body. He must now battle a secret Nazi organisation headed by Johann Schmidt to defend his nation.', 'captain america.jpg', 160, 21.9),
(9, 'qq', '11', '846925-section 01 (2).png', 0, 1),
(10, '1', '1', '3926-whatsapp_image_2021_04_26_at_2_59_16_pm.jpeg', 1, 1),
(11, 'ww', 'ww', '983355-section 01 (2).png', 1, 1),
(12, '23', '23', '153526-564447-200d57b9520f4d21c4d49b98aefddcb4.jpg', 23, 23),
(13, '1', '11', '629277-screenshot (311).png', 11, 11),
(14, '22', '22', '927594-14.1.jpg', 22, 22),
(15, '12', '12', '211665-18.1.png', 123, 123);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `login` varchar(30) NOT NULL,
  `password` varchar(300) NOT NULL,
  `usertype` varchar(10) NOT NULL,
  `photo` varchar(100) DEFAULT 'default.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `fullname`, `login`, `password`, `usertype`, `photo`) VALUES
(1, 'Mr admin', 'admin', '1234567', 'admin', 'default.png'),
(2, 'Mr member', 'member', '1234567', 'member', 'default.png'),
(3, 'lee12444', 'lee', '1111111', 'member', '853114-avatar.jpg'),
(4, 'pua', 'pua12', '1111111', 'member', '729976-section 01 (2).png'),
(5, 'kk', 'kk12', '12qwas', 'member', '669825-screenshot (306).png'),
(6, 'we', 'we12', '12qwas', 'member', '103619-196879-section-01-(2).png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingID`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
