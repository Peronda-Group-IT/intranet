'use server';
import { getSession } from './session';
import { revalidatePath } from 'next/cache';
const sql = require('mssql');
const { default: dbInstance } = require('@/database/db');

export async function loadUsersFromDb(search) {
  try {
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    let insidersQuery = `
      SELECT 
        us.username, 
        us.email, 
        'insider' AS type,
        ISNULL(vis.visibility, '[]') AS visibility
        FROM usuarios AS us
        LEFT JOIN intranet_user_group_visibility AS vis
            ON us.username = vis.username
    `;
    let externalsQuery = `
      SELECT 
        us.username, 
        us.email, 
        us.active,
        'external' AS type,
        ISNULL(vis.visibility, '[]') AS visibility
        FROM usuarios_externos AS us
        LEFT JOIN intranet_user_group_visibility AS vis
            ON us.username = vis.username
    `;

    if (search) {
      insidersQuery += ` WHERE us.username LIKE '%${search}%' OR us.email LIKE '%${search}%'`;
      externalsQuery += ` WHERE us.username LIKE '%${search}%' OR us.email LIKE '%${search}%'`;
    }

    insidersQuery += ' ORDER BY us.username';
    externalsQuery += ' ORDER BY us.username';

    const resultInsiders = await request.query(insidersQuery);
    let insiders = [];
    if (resultInsiders && resultInsiders.recordset.length > 0) {
      insiders = resultInsiders.recordset;
    }

    const resultExternals = await request.query(externalsQuery);
    let externals = [];
    if (resultExternals && resultExternals.recordset.length > 0) {
      externals = resultExternals.recordset;
    }

    const allUsers = [...insiders, ...externals];

    // Sort all users by username
    allUsers.sort((a, b) => a.username.localeCompare(b.username));

    return allUsers;
  } catch (error) {
    console.error('Failed to load users from DB');
    return [];
  }
}

export async function upadteUserVisibilityInDb(username, visibility) {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);
    const visibilityString = JSON.stringify(visibility);
    request.input('username', sql.NVarChar, username);
    request.input('visibility', sql.NVarChar, visibilityString);
    const result = await request.query(`
      MERGE intranet_user_group_visibility AS target
      USING (SELECT @username AS username, @visibility AS visibility) AS source
        ON target.username = source.username
        WHEN MATCHED THEN
            UPDATE SET visibility = source.visibility, updated_at = GETDATE()
        WHEN NOT MATCHED THEN
            INSERT (username, visibility) VALUES (source.username, source.visibility);
    `);
    if (!result || result.rowsAffected[0] === 0) {
      return { success: false, message: 'visivility_update_error' };
    }
    revalidatePath('/home/users');
    return { success: true, message: 'visivility_update_success' };
  } catch (error) {
    console.error('Failed to update user visibility in DB', error);
    return { success: false, message: 'visivility_update_error' };
  }
}

export async function setExternalUserActive(username) {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);
    request.input('username', sql.NVarChar, username);
    const result = await request.query(`
            UPDATE usuarios_externos
            SET active = 'S',
            updated_at = GETDATE()
            WHERE username = @username
        `);
    if (!result || result.rowsAffected[0] === 0) {
      return { success: false, message: 'user_activate_error' };
    }
    revalidatePath('/home/users');
    return { success: true, message: 'user_activate_success' };
  } catch (error) {
    console.error('Failed to activate external user in DB', error);
    return { success: false, message: 'user_activate_error' };
  }
}
