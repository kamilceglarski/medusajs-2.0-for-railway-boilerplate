const { Pool } = require('pg');

async function run() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:medusa@localhost:5432/medusa_db' });
    const pw = 'c2NyeXB0AA4AAAAIAAAAAYzvbIDUn5haU0+sgJIJUIFzbcQhuo9wRIPFoxzP5R9+jbzXvyPX3Oa3xkZkGHfBrGTX5d1xkVPTcbq/QE1pMbZI+KAZ8nsYjA6mVNQRhgeW';
    const id = '01K9VXN1KCA87BKRRPNHC93ZNW';
    const sql = `UPDATE provider_identity SET provider_metadata = jsonb_set(COALESCE(provider_metadata, '{}'::jsonb), '{password}', $1::jsonb) WHERE id = $2 RETURNING id, provider_metadata`;
    try {
        const res = await pool.query(sql, [JSON.stringify(pw), id]);
        console.log(res.rows);
    } catch (e) {
        console.error('ERROR', e);
    } finally {
        await pool.end();
    }
}

run();
