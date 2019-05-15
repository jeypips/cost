-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 15, 2019 at 03:17 PM
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
(1, 1, 'Sample', 'Red', '1', '2', '3', '6');

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `unique_no` varchar(50) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `confirm_password` varchar(100) DEFAULT NULL,
  `groups` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `unique_no`, `firstname`, `middlename`, `lastname`, `username`, `password`, `confirm_password`, `groups`, `date_added`) VALUES
(1, '2019-001', 'Michelle Mae', 'J', 'Esperanza', 'admin', 'admin', 'admin', 1, '2019-05-11 14:16:20'),
(2, '2019-002', 'Roldan', 'C', 'Castro', 'roldan', 'roldan', 'roldan', 2, '2019-05-11 14:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `code` int(11) DEFAULT NULL,
  `article_no` varchar(50) DEFAULT NULL,
  `article_no_revision` varchar(10) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `design_name` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `pattern_date` varchar(100) DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `desired_size` varchar(100) DEFAULT NULL,
  `full_width_desired_size` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `raw_size` varchar(100) DEFAULT NULL,
  `estimate` varchar(100) DEFAULT NULL,
  `final_raw_size` varchar(100) DEFAULT NULL,
  `full_width_fabric` varchar(100) DEFAULT NULL,
  `finished_size` varchar(100) DEFAULT NULL,
  `shrinkage` varchar(100) DEFAULT NULL,
  `process_by` varchar(100) DEFAULT NULL,
  `pattern_by` varchar(100) DEFAULT NULL,
  `not_unique` varchar(100) DEFAULT NULL,
  `revision` varchar(10) DEFAULT NULL,
  `modified` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `code`, `article_no`, `article_no_revision`, `description`, `design_name`, `date`, `pattern_date`, `customer`, `desired_size`, `full_width_desired_size`, `color`, `raw_size`, `estimate`, `final_raw_size`, `full_width_fabric`, `finished_size`, `shrinkage`, `process_by`, `pattern_by`, `not_unique`, `revision`, `modified`) VALUES
(1, 1, '1312011', '000', 'Pillowcase', 'Pillowcase', '06/10/2017', NULL, NULL, NULL, NULL, 'Red', '10', NULL, NULL, NULL, NULL, NULL, 'Radjz', '1', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Office 1');

-- --------------------------------------------------------

--
-- Table structure for table `descriptions`
--

CREATE TABLE `descriptions` (
  `id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `descriptions`
--

INSERT INTO `descriptions` (`id`, `code`, `name`) VALUES
(1, '2.75', 'Pillowcase'),
(2, '2.90', 'Duvet Cover'),
(3, '0.55', 'Top Sheet/Flat Sheet');

-- --------------------------------------------------------

--
-- Table structure for table `fabric`
--

CREATE TABLE `fabric` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `quality` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `qty` varchar(100) DEFAULT NULL,
  `dimension_w` varchar(100) DEFAULT NULL,
  `dimension_l` varchar(100) DEFAULT NULL,
  `fabric_m` varchar(100) DEFAULT NULL,
  `landed_cost` varchar(100) DEFAULT NULL,
  `cost` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fabric`
--

INSERT INTO `fabric` (`id`, `articles_id`, `description`, `quality`, `color`, `qty`, `dimension_w`, `dimension_l`, `fabric_m`, `landed_cost`, `cost`) VALUES
(1, 1, 'Sample', 'Sample', 'Red', '1', '2', '3', '0.00066', '4', '0');

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
(1, 'Admin', 'Administrator', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C227368656574735C222C5C226465736372697074696F6E5C223A5C225368656574735C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A322C5C226465736372697074696F6E5C223A5C22416464205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A332C5C226465736372697074696F6E5C223A5C2245646974205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A342C5C226465736372697074696F6E5C223A5C2244656C657465205368656574735C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A747275657D5D7D5D22'),
(2, 'User', 'User', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C227368656574735C222C5C226465736372697074696F6E5C223A5C225368656574735C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A322C5C226465736372697074696F6E5C223A5C22416464205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A332C5C226465736372697074696F6E5C223A5C2245646974205368656574735C222C5C2276616C75655C223A747275657D2C7B5C2269645C223A342C5C226465736372697074696F6E5C223A5C2244656C657465205368656574735C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22');

-- --------------------------------------------------------

--
-- Table structure for table `labor`
--

CREATE TABLE `labor` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `process` varchar(100) DEFAULT NULL,
  `special_instruction` varchar(100) DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `approved_time` varchar(100) DEFAULT NULL,
  `tl_min` varchar(100) DEFAULT NULL,
  `hour` varchar(100) DEFAULT NULL,
  `min` varchar(100) DEFAULT NULL,
  `sec` varchar(100) DEFAULT NULL,
  `multiplier` varchar(50) DEFAULT NULL,
  `cost` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `labor`
--

INSERT INTO `labor` (`id`, `articles_id`, `department`, `process`, `special_instruction`, `operator`, `approved_time`, `tl_min`, `hour`, `min`, `sec`, `multiplier`, `cost`) VALUES
(1, 1, 'Office', 'Sample', 'Sample', 'Sample', '1', '2', '3', '4', '5', '6', '12');

-- --------------------------------------------------------

--
-- Table structure for table `thread`
--

CREATE TABLE `thread` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
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
(6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 'Sample', 'Sample', 'Red', '1', '2', '-1', '3', '-3');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `descriptions`
--
ALTER TABLE `descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `fabric`
--
ALTER TABLE `fabric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessory`
--
ALTER TABLE `accessory`
  ADD CONSTRAINT `accessory_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
