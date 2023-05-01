# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2023-04-30

### Added

- Added service for room messages.
- Fixed endpoint to store messages on a room.
- Fixed endpoint to retrieve messages on a room.

## [0.3.1] - 2023-04-30

### Fixed

- Fixed method to `sendMessage`.
- Fixed method `getLatestMessages`.

## [0.3.0] - 2023-04-30

### Added

- Added CRUD for users.
- Added security layer for hasing password when storing a new user.
- Fixed endpoint to store members on a room.

## [0.2.1] - 2023-04-30

### Added

- Added validations on room controller for working with dtos only.

## [0.2.0] - 2023-04-30

### Added

- Added Model dto for requests on room controller.

## [0.1.0] - 2023-04-30

### Added

- Added environment vars validation with own nest service.
- Added Swagger starter route.
- Added connection with mongodb for Room model.

## [0.0.1] - 2023-04-20

### Added

- Added base project with the main logic for schemas, service, controller and module for the room feature.
- Added schemas for user and message.
- Added .env.example file
- Added eslint and prettier rules.
