# CANA PHP and MySQL API

The React app sends account sign-up and sign-in requests to `auth.php`. PHP connects to MySQL; phpMyAdmin is used to create and manage the database.

## 1. Create the database

In phpMyAdmin, open **Import**, choose `schema.sql`, and run the import. This creates `cana_db` and its `users` table.

## 2. Start the API

Install/start MySQL with XAMPP (and Apache if you use phpMyAdmin), then start PHP's development server from this project's `server` folder:

```powershell
php -S localhost:8000
```

If Windows says `php` is not recognized and you installed XAMPP in its default location, run `C:\xampp\php\php.exe -S localhost:8000` instead.

The default settings expect a local MySQL server at `127.0.0.1`, database `cana_db`, user `root`, and an empty password (the common local XAMPP defaults). Set `CANA_DB_HOST`, `CANA_DB_NAME`, `CANA_DB_USER`, and `CANA_DB_PASSWORD` in the environment before starting PHP if your local MySQL credentials differ. Never put database credentials in the React app.

## 3. Start CANA

In another terminal at the project root:

```powershell
pnpm dev
```

The frontend expects the API at `http://localhost:8000/auth.php`. Set `VITE_API_URL` in a project `.env.local` if you run the API elsewhere, for example `VITE_API_URL=http://localhost:8000/auth.php`.

Sign-up and sign-in use the PHP/MySQL API. Cart, wishlist, and customer order history use browser storage; checkout also records orders in MySQL for inventory and admin reporting.

## Admin dashboard

Re-import `schema.sql` (it uses `IF NOT EXISTS`, and the inventory seed preserves existing stock) to create the admin, inventory, and order tables. From `server`, create or reset an admin account with:

When updating an existing database for the new order stages, also import `migrations/001_order_tracking_statuses.sql` in phpMyAdmin. This keeps previous orders and maps `processing` to `preparing` and `delivered` to `received`.

```powershell
php create_admin.php admin@example.com
```

Enter a password of at least 12 characters when prompted. Alternatively, while the `admins` table is empty, open `http://localhost:5173/admin` and choose **Create the first admin account**. Public admin sign-up closes after the first account is created. Start the API and frontend as above, then sign in to access the dashboard. It shows recorded revenue and daily sales, allows inventory quantity changes, and tracks order fulfillment status. Checkout records sales and decrements stock in MySQL; existing browser-only orders are not imported into the dashboard.
