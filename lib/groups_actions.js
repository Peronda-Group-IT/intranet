'use server';
import { getSession } from './session';
import { revalidatePath } from 'next/cache';
const sql = require('mssql');
const { default: dbInstance } = require('@/database/db');

export async function loadGroupsFromDb() {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    const query = `
    SELECT g.*
    FROM intranet_groups AS g
    JOIN intranet_user_group_visibility AS v
        ON v.username = @username
    WHERE g.id IN (
        SELECT value
        FROM OPENJSON(v.visibility)
    );`;

    request.input('username', sql.VarChar, session.username);

    const result = await request.query(query);

    if (!result || result.recordset.length === 0) {
      return [];
    }

    return result.recordset;
  } catch (error) {
    console.error('Failed to load groups from DB');
    return [];
  }
}

export async function loadAllGroupsFromDb() {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    const result = await request.query('SELECT * FROM intranet_groups ORDER BY id DESC');

    if (!result || result.recordset.length === 0) {
      return [];
    }

    return result.recordset;
  } catch (error) {
    console.error('Failed to load groups from DB');
    return [];
  }
}


export async function createGroupAction(currentState, formData) {
  const groupId = formData.get('groupId');
  const groupName = formData.get('groupName');

  const result = await createGroupInDb(groupId, groupName);

  await revalidatePath('/home/groups');

  // Return a new state or success/error message
  return result;
}

async function createGroupInDb(id, name) {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input('id', sql.Int, id);
    request.input('name', sql.VarChar, name);

    const result = await request.query(
      'INSERT INTO intranet_groups (id, name) VALUES (@id, @name)'
    );

    if (!result || result.rowsAffected[0] === 0) {
      return { success: false, message: 'Failed to create group.' };
    }

    return { success: true, message: 'Group created successfully!' };
  } catch (error) {
    console.error('Failed to create groups in DB', error);
    return { success: false, message: 'Failed to create group.' };
  }
}

export async function deleteGroupFromDb(id) {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input('id', sql.Int, id);

    const result = await request.query(
      'DELETE FROM intranet_groups WHERE id=@id'
    );

    if (!result || result.rowsAffected[0] === 0) {
      return { success: false, message: 'Failed to delete group.' };
    }

    await revalidatePath('/home/groups');

    return { success: true, message: 'Group deleted successfully!' };
  } catch (error) {
    console.error('Failed to delete groups in DB', error);
    return { success: false, message: 'Failed to delete group.' };
  }
}
