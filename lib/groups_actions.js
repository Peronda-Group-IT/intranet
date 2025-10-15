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

    const result = await request.query('SELECT * FROM intranet_groups');

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

  // TODO: Implement actual group creation logic here (e.g., API call)
  console.log('Creating group with ID:', groupId, 'and Name:', groupName);

  // Simulate an async operation
  const result = await createGroupInDb(groupId, groupName);

  await revalidatePath('/home/groups');

  // Return a new state or success/error message
  return result;
}

export async function createGroupInDb(id, name) {
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
    console.error('Failed to load groups from DB', error);
    return { success: false, message: 'Failed to create group.' };
  }
}
