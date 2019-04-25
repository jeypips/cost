-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 25, 2019 at 05:35 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cost`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessory`
--

CREATE TABLE `accessory` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `item` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `consumption` varchar(50) DEFAULT NULL,
  `landed_cost` varchar(50) DEFAULT NULL,
  `cost` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accessory`
--

INSERT INTO `accessory` (`id`, `articles_id`, `item`, `color`, `size`, `consumption`, `landed_cost`, `cost`) VALUES
(1, 4, '4', '5', '5', '6', '6', '5');

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `groups` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `firstname`, `middlename`, `lastname`, `username`, `password`, `groups`, `date_added`) VALUES
(1, 'John Paul', 'G', 'Balanon', 'admin', 'wawakw', 1, '2019-04-22 15:12:50'),
(2, 'Michelle Mae', 'J', 'Esperanza', 'michelle', 'michelle', 1, '2019-04-22 16:30:52'),
(3, 'Roldan', 'C', 'Castro', 'roldan', 'roldan', 2, '2019-04-23 14:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `article_no` varchar(50) DEFAULT NULL,
  `article_no_revision` varchar(10) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `design_name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `pattern_date` varchar(100) DEFAULT NULL,
  `customer` varchar(150) DEFAULT NULL,
  `desired_size` varchar(50) DEFAULT NULL,
  `full_width_desired_size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `raw_size` varchar(50) DEFAULT NULL,
  `estimate` varchar(50) DEFAULT NULL,
  `final_raw_size` varchar(50) DEFAULT NULL,
  `full_width_fabric` varchar(50) DEFAULT NULL,
  `finished_size` varchar(50) DEFAULT NULL,
  `shrinkage` varchar(50) DEFAULT NULL,
  `process_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `article_no`, `article_no_revision`, `description`, `design_name`, `date`, `pattern_date`, `customer`, `desired_size`, `full_width_desired_size`, `color`, `raw_size`, `estimate`, `final_raw_size`, `full_width_fabric`, `finished_size`, `shrinkage`, `process_by`) VALUES
(1, '2.71', '000', '1', NULL, '2019-04-25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(2, '2.71', '100', '1', NULL, '2019-04-25', NULL, NULL, NULL, NULL, 'Red', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, '2.71', '200', '1', NULL, '2019-04-25', NULL, NULL, NULL, NULL, 'Blue', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, '23.1 1113', '000', '3', 'Degn', '2019-04-25', 'mm/dd/yyyy', 'Jp', '10Cm', 'asd', '#444', '14Cm', NULL, '23', 'sad', 'asd', '78', 1);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Office 1'),
(2, 'Office 2');

-- --------------------------------------------------------

--
-- Table structure for table `descriptions`
--

CREATE TABLE `descriptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `descriptions`
--

INSERT INTO `descriptions` (`id`, `name`) VALUES
(1, 'Pillowcase'),
(2, 'Duvet Cover'),
(3, 'Top Sheet/Flat Sheet');

-- --------------------------------------------------------

--
-- Table structure for table `fabric`
--

CREATE TABLE `fabric` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quality` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `qty` varchar(50) DEFAULT NULL,
  `dimension_w` varchar(10) DEFAULT NULL,
  `dimension_l` varchar(10) DEFAULT NULL,
  `fabric_m` varchar(50) DEFAULT NULL,
  `landed_cost` varchar(50) DEFAULT NULL,
  `cost` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fabric`
--

INSERT INTO `fabric` (`id`, `articles_id`, `description`, `quality`, `color`, `qty`, `dimension_w`, `dimension_l`, `fabric_m`, `landed_cost`, `cost`) VALUES
(1, 1, '1', '', '', '', '', '', '', '', ''),
(2, 2, '1', '', '', '', '', '', '', '', ''),
(3, 3, '2', '', '', '', '', '', '', '', ''),
(4, 4, '2', '1', 'Red', '5', '45', '45', '4', '4', '4');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `privileges` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `privileges`) VALUES
(1, 'Admin', 'Administrator', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A747275657D5D7D5D22'),
(2, 'User', 'User', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22');

-- --------------------------------------------------------

--
-- Table structure for table `labor`
--

CREATE TABLE `labor` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `process` varchar(100) DEFAULT NULL,
  `special_instruction` varchar(550) DEFAULT NULL,
  `operator` varchar(100) DEFAULT NULL,
  `approved_time` varchar(50) DEFAULT NULL,
  `tl_min` varchar(10) DEFAULT NULL,
  `hour` varchar(10) DEFAULT NULL,
  `min` varchar(10) DEFAULT NULL,
  `sec` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `labor`
--

INSERT INTO `labor` (`id`, `articles_id`, `department`, `process`, `special_instruction`, `operator`, `approved_time`, `tl_min`, `hour`, `min`, `sec`) VALUES
(1, 4, '1', '4', '5', '5', '5', '6', '7', '8', '6');

-- --------------------------------------------------------

--
-- Table structure for table `thread`
--

CREATE TABLE `thread` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quality` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `initial_wt` varchar(50) DEFAULT NULL,
  `net_wt` varchar(50) DEFAULT NULL,
  `total_weight` varchar(50) DEFAULT NULL,
  `landed_cost` varchar(50) DEFAULT NULL,
  `cost` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `thread`
--

INSERT INTO `thread` (`id`, `articles_id`, `description`, `quality`, `color`, `initial_wt`, `net_wt`, `total_weight`, `landed_cost`, `cost`) VALUES
(1, 4, '1', '4', '4', '4', '4', '5', '6', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessory`
--
ALTER TABLE `accessory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_id` (`articles_id`);

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups` (`groups`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `descriptions`
--
ALTER TABLE `descriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fabric`
--
ALTER TABLE `fabric`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_id` (`articles_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `labor`
--
ALTER TABLE `labor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_id` (`articles_id`);

--
-- Indexes for table `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_id` (`articles_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accessory`
--
ALTER TABLE `accessory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `descriptions`
--
ALTER TABLE `descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `fabric`
--
ALTER TABLE `fabric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `labor`
--
ALTER TABLE `labor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `thread`
--
ALTER TABLE `thread`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessory`
--
ALTER TABLE `accessory`
  ADD CONSTRAINT `accessory_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`groups`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fabric`
--
ALTER TABLE `fabric`
  ADD CONSTRAINT `fabric_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `labor`
--
ALTER TABLE `labor`
  ADD CONSTRAINT `labor_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `thread`
--
ALTER TABLE `thread`
  ADD CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
