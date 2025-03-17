import { simpleGit } from 'simple-git';
import { writeFileSync } from 'fs';
import { join } from 'path';

const git = simpleGit();
const backupBranch = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}`;

async function createBackup() {
  try {
    // Check if Git is initialized
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.log('Initializing Git repository...');
      await git.init();
      await git.add('.');
      await git.commit('Initial commit');
    }

    // Create and switch to backup branch
    console.log(`Creating backup branch: ${backupBranch}`);
    await git.checkoutLocalBranch(backupBranch);

    // Add all changes
    await git.add('.');
    
    // Commit changes
    const timestamp = new Date().toISOString();
    await git.commit(`Backup ${timestamp}`);

    // Create backup log
    const backupLog = {
      timestamp,
      branch: backupBranch,
      commit: await git.revparse(['HEAD'])
    };

    writeFileSync(
      join(process.cwd(), 'backup-log.json'),
      JSON.stringify(backupLog, null, 2)
    );

    console.log('Backup completed successfully!');
    console.log('Backup details:', backupLog);

    // Return to main branch
    await git.checkout('main');

  } catch (error) {
    console.error('Error creating backup:', error);
    process.exit(1);
  }
}

createBackup();