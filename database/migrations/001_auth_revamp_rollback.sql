-- Rollback: 001_auth_revamp_rollback.sql
-- Description: Reverts the migration by dropping tables and removing added columns from users.

DROP TABLE IF EXISTS `auth_rate_limits`;
DROP TABLE IF EXISTS `password_resets`;

ALTER TABLE `users`
  DROP COLUMN IF EXISTS `google_id`,
  DROP COLUMN IF EXISTS `password`,
  DROP COLUMN IF EXISTS `email`,
  DROP COLUMN IF EXISTS `username`;

ALTER TABLE `users`
  MODIFY COLUMN `phone` VARCHAR(255) NOT NULL,
  MODIFY COLUMN `token` VARCHAR(255) NOT NULL;
