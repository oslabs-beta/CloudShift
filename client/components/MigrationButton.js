import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange } from '../slice.js';
import { migrateData } from '../services/migrate.js';

const StartMigrationButton = () => {
  const dispatch = useDispatch();

  const { origin, destination, isMigrating } = useSelector(
    (state) => state.GUI
  );

  //Run migration logic.
  useEffect(() => {
    if (!isMigrating) return;
    dispatch(migrateData({ origin, destination }));
  }, [isMigrating]);

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => dispatch(migrationStatusChange(true))}
        >
          Start Migration
        </button>
      </div>
    </>
  );
};

export default StartMigrationButton;
