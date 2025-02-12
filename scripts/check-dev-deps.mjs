import { execSync } from 'child_process';

const requiredDeps = [
  'npm-run-all',
  'firebase-tools',
  'typescript',
  'ts-node'
];

function checkDependencies() {
  console.log('Checking development dependencies...');
  
  for (const dep of requiredDeps) {
    try {
      execSync(`npm list ${dep} --depth=0`, { stdio: 'ignore' });
    } catch (error) {
      console.log(`Installing missing dependency: ${dep}`);
      execSync(`npm install --save-dev ${dep}`, { stdio: 'inherit' });
    }
  }
  
  console.log('All development dependencies are installed.');
}

checkDependencies(); 