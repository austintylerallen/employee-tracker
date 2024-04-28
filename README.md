# Employee Tracker

Employee Tracker is a command-line application built witindex.js and PostgreSQL that allows you to manage departments, roles, and employees within an organization.

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee's role
- Clean and intuitive command-line interface

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/austintylerallen/employee-tracker.git
```
2. Install Dependencies:

```bash
cd employee-tracker
npm install
```

3. Set up your PostgreSQL database:

   - Create a new database named `employee_tracker`.
   - Run the SQL schema provided in `db/schema.sql` to create the necessary tables.
   - Optionally, seed the database with sample data using the SQL queries in `db/seeds.sql`.

4. Configure the database connection:

   - Open `index.js` and update the database connection settings with your PostgreSQL credentials.

5. Start the application:

```bash
npm start
```

## Usage

Once the application is running, you'll be presented with a menu of options to choose from. Use the arrow keys to navigate and press Enter to select an option.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


