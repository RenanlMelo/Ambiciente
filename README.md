# Ambiciente

Ambiciente is a digital platform dedicated to environmental care and preservation. The site enables users to report environmental violations, offers informative articles, and presents an interactive map that displays environmental indicators by state. Users can also track their reports through a secure login and registration system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Configuration](#installation-and-configuration)
- [Versioning](#versioning)

## Overview

Ambiciente engages the community in protecting the environment by allowing users to report irregularities, stay informed through articles, and view up-to-date environmental data. With a secure login and registration system, users can track the status of their reports and access exclusive content.

## Features

### Reporting Page
- **Description:** Enables users to report environmental violations.
- **Features:** A comprehensive form to input details of the violation, including location, date, and the option to attach files (images, videos).
- **Objective:** Facilitate the submission of reports so that authorities can take the necessary actions.

### Articles Page
- **Description:** Gathers content and news about the environment.
- **Features:** Articles organized by category, with search functionality and filters for efficient navigation.
- **Objective:** Inform and raise awareness among users about sustainable practices and environmental preservation.

### Environmental Map Page
- **Description:** Displays an interactive map integrated with Power BI that presents environmental indicators by state.
- **Features:** Visualization of data such as air quality, water quality, pollution levels, among others, using embedded Power BI dashboards.
- **Objective:** Provide a clear and updated view of the environmental state across different regions of the country through interactive reports.

### Login and Registration System
- **Description:** User authentication area.
- **Features:** Registration and login forms, along with a control panel to track submitted reports.
- **Objective:** Allow users to track the status of their reports and access personalized content.

## Technologies Used

- **Front-end:** 
  - **Next.js:** A React framework for building modern and scalable interfaces.
  - **Tailwind CSS:** A CSS framework for rapid and responsive styling.
- **Back-end:** 
  - **FastAPI:** A Python framework for creating fast and efficient APIs.
- **Database:** 
  - **SQLite:** A lightweight database ideal for small to medium-sized applications.
- **Data Visualization:** 
  - **Power BI:** For creating and integrating interactive dashboards that display environmental indicators.

## Installation and Configuration

### Prerequisites

- Node.js (for the front-end with Next.js)
- Python 3.8+ (for the back-end with FastAPI)
- npm or yarn package manager
- A Python virtual environment (optional, but recommended)

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/RenanlMelo/Ambiciente.git
   ```
   ```bash
   cd Ambiciente
   ```
   
2. **Front-end Setup:**
   - Navigate to the Next.js project directory:
    ```bash
   cd frontend
   ```
    
    - Install dependencies:
    ```bash
   npm install
    # or, if you prefer yarn:
    yarn install
   ```

    - Start the development server:
    ```bash
   npm run dev
    # or
    yarn dev
   ```
    
3. **Back-end Setup:**
   - Navigate to the back-end directory:
    ```bash
   cd ../backend
   ```
    
    - Create and activate a virtual environment (optional but recommended):
    ```bash
   python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

    - Install dependencies:
    ```bash
   pip install -r requirements.txt
   ```

    - Start the FastAPI server:
    ```bash
   uvicorn main:app --reload
   ```

## Versioning

---

## [1.0.0] - 2025-05-06
### Added
- Production release

---

## [0.5.0] - 2025-05-06
### Changed
- Optimized image tags for Next.js
- Improved article creation and editing functionalities
- Fixed admin functionalities
- Improved rendering performance

## [0.4.0] - 2025-05-05
### Added
- Power BI map
- Image selection option for each article

### Changed
- Improved responsiveness
- Updated image handling (front-end and back-end)
- Updated article PUT request

---

## [0.3.0] - 2025-05-02
### Added
- Private routes for each user role
- Admin functionalities: user management, staff sign-up, and user table view

### Fixed
- Static Site Generation (SSG) errors

### Changed
- Improved responsiveness

---

## [0.2.3] - 2025-04-30
### Added
- Roles functionality (front-end and back-end)
- Functionality to the reports page

### Changed
- Improved responsiveness

---

## [0.2.2] - 2025-04-26
### Changed
- Improved sign-in and sign-up functionalities
- Improved responsiveness
- Updated mobile header

---

## [0.2.1] - 2025-04-24
### Changed
- Updated sign-in and sign-up functionalities
- Added text responsiveness

---

## [0.2.0] - 2025-04-22
### Added
- User routes, schema, and model (sign-in and sign-up)

---

## [0.1.0] - 2025-03-24
### Added
- Topic functionalities within articles

### Changed
- Updated article request functionalities

---

## [0.0.3] - 2025-03-14
### Changed
- Rearranged back-end structure

---

## [0.0.2] - 2025-03-08
### Changed
- Updated article request functionalities

---

## [0.0.1] - 2025-03-07
### Added
- Initial back-end functionalities

---

## [0.0.0] - 2025-02-25
### Added
- Main pages and components

---
