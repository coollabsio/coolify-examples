#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."
until psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  sleep 1
done

echo "Creating test table..."
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" <<SQL
CREATE TABLE IF NOT EXISTS test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test_table (name) VALUES ('hello from bootstrap');
SQL

echo "Bootstrap complete!"
