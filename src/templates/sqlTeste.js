// templates/databaseInit.js

export const databaseInit = (projectName, banco = 'mysql') => {
  const base = `
CREATE DATABASE IF NOT EXISTS ${projectName.toLowerCase()}_db;
USE ${projectName.toLowerCase()}_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

  // PostgreSQL (sintaxe um pouco diferente)
  if (banco === 'postgres') {
    return `
CREATE DATABASE ${projectName.toLowerCase()}_db;
\\c ${projectName.toLowerCase()}_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
  }

  return base
}