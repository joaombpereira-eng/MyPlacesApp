import {openDatabase} from 'react-native-sqlite-storage';

const database = async () => {
  return openDatabase({name: 'places.db'});
};

export const createTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS places (
	      id INTENGER PRIMARY KEY NOT NULL,
	      title TEXT NOT NULL,
	      imageUri TEXT NOT NULL,
	      address TEXT NOT NULL,
	      lat REAL NOT NULL,
	      lng REAL NOT NULL
	  );`;

  await db.executeSql(query, []);
};
