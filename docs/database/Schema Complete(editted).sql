
USE `destroys_nextstepevents` ;

-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 67
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`events` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `start_date` DATETIME NULL DEFAULT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_events_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_events_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `destroys_nextstepevents`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`events_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`events_has_users` (
  `events_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`events_id`, `users_id`),
  INDEX `fk_events_has_users_users1_idx` (`users_id` ASC),
  INDEX `fk_events_has_users_events1_idx` (`events_id` ASC),
  CONSTRAINT `fk_events_has_users_events1`
    FOREIGN KEY (`events_id`)
    REFERENCES `destroys_nextstepevents`.`events` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `destroys_nextstepevents`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `thread_id` INT(11) NOT NULL,
  `parent_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 89
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`rooms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `event_id` BIGINT(20) NULL DEFAULT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`rooms_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`rooms_has_users` (
  `room_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `destroys_nextstepevents`.`threads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `destroys_nextstepevents`.`threads` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `update_at` DATETIME NULL DEFAULT NULL,
  `room_id` INT(11) NULL DEFAULT NULL,
  `user_id` VARCHAR(255) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_threads_rooms1_idx` (`room_id` ASC),
  CONSTRAINT `fk_threads_rooms1`
    FOREIGN KEY (`room_id`)
    REFERENCES `destroys_nextstepevents`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
