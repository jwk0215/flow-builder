import mysql, { PoolConnection, ResultSetHeader } from "mysql2/promise";




// DB POOL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});


/**
 * transaction()
 * @param callback 
 */
export async function transaction(
    callback: (conn: PoolConnection) => Promise<any>
): Promise<any> {
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();
        const result = await callback(conn);
        await conn.commit();

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
}


/**
 * query 실행(insert, update, delete)
 * @param sql 
 * @param params 
 * @returns 
 */
export async function write(
    sql: string,
    params?: any[]
) {
    const [ result ] = await pool.execute<ResultSetHeader>(sql, params);
    return result;
}


/**
 * query 실행(select)
 * @param sql 
 * @param params 
 * @returns 
 */
export async function read<T = any>(
    sql: string,
    params?: any[]
): Promise<T[]> {
    const [ rows ] = await pool.execute(sql, params);
    return rows as T[]
}