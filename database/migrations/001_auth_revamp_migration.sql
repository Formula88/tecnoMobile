-- Migration: 001_auth_revamp_migration.sql
-- Description: Adds username, email, password, google_id to users, and creates password_resets and auth_rate_limits tables.

-- 1. Modify users table columns to be nullable where needed
ALTER TABLE `users` 
  MODIFY COLUMN `phone` VARCHAR(255) NULL DEFAULT NULL,
  MODIFY COLUMN `token` VARCHAR(255) NULL DEFAULT NULL;

-- 2. Add new authentication columns
ALTER TABLE `users`
  ADD COLUMN `username` VARCHAR(100) NULL UNIQUE AFTER `id`,
  ADD COLUMN `email` VARCHAR(191) NULL UNIQUE AFTER `username`,
  ADD COLUMN `password` VARCHAR(255) NULL AFTER `email`,
  ADD COLUMN `google_id` VARCHAR(255) NULL UNIQUE AFTER `password`;

-- 3. Populate existing users with fallback usernames, emails, and bcrypt passwords
-- Admin id 10
UPDATE `users` 
SET 
  `username` = COALESCE(`username`, 'admin'),
  `email` = COALESCE(`email`, 'admin@tecnomobile.ir'),
  `password` = COALESCE(`password`, '$2y$10$Yu3rS.LHg3UoSZ8TV1qzXu4heoe21EtabzfWyOnUDpEB2VCgI.iK.')
WHERE `id` = 10;

-- Admin id 12
UPDATE `users` 
SET 
  `username` = COALESCE(`username`, 'admin2'),
  `email` = COALESCE(`email`, 'admin2@tecnomobile.ir'),
  `password` = COALESCE(`password`, '$2y$10$Yu3rS.LHg3UoSZ8TV1qzXu4heoe21EtabzfWyOnUDpEB2VCgI.iK.')
WHERE `id` = 12;

-- Admin id 13
UPDATE `users` 
SET 
  `username` = COALESCE(`username`, 'admin3'),
  `email` = COALESCE(`email`, 'admin3@tecnomobile.ir'),
  `password` = COALESCE(`password`, '$2y$10$Yu3rS.LHg3UoSZ8TV1qzXu4heoe21EtabzfWyOnUDpEB2VCgI.iK.')
WHERE `id` = 13;

-- User id 7
UPDATE `users` 
SET 
  `username` = COALESCE(`username`, 'user_09390719229'),
  `email` = COALESCE(`email`, 'user7@tecnomobile.ir'),
  `password` = COALESCE(`password`, '$2y$10$9AemiO8UqqeMZL6yI./lhelXr8nhZNuWrfHynyJCJpjE8gNbxycgS')
WHERE `id` = 7;

-- User id 14
UPDATE `users` 
SET 
  `username` = COALESCE(`username`, 'user_09901251547'),
  `email` = COALESCE(`email`, 'user14@tecnomobile.ir'),
  `password` = COALESCE(`password`, '$2y$10$9AemiO8UqqeMZL6yI./lhelXr8nhZNuWrfHynyJCJpjE8gNbxycgS')
WHERE `id` = 14;

-- Fallback for any other user without username
UPDATE `users`
SET 
  `username` = CONCAT('user_', id),
  `email` = CONCAT('user_', id, '@tecnomobile.ir'),
  `password` = '$2y$10$9AemiO8UqqeMZL6yI./lhelXr8nhZNuWrfHynyJCJpjE8gNbxycgS'
WHERE `username` IS NULL;

-- 4. Create password_resets table
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `used` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_token` (`token`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Create auth_rate_limits table
CREATE TABLE IF NOT EXISTS `auth_rate_limits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `action` VARCHAR(50) NOT NULL,
  `identifier` VARCHAR(191) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `attempted_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_action_id_ip` (`action`, `identifier`, `ip_address`, `attempted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
