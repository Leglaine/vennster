const { Pool } = require("pg");

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

module.exports = {
  // For single queries
  // Automatically releases client
  async query(text, params) {
    const response = await pool.query(text, params);
    return response;
  },
  // For transactions
  // Client must be released
  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    client.query = (...args) => {
      return query.apply(client, args);
    };

    client.release = () => {
      return release.apply(client);
    };

    return client;
  },
};
